import { useMemo } from 'react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Main from '@/components/Main';
import { useRouter } from 'next/router'
import Link from 'next/link';
import styles from '@/styles/Forecast.module.css';
import ForecastData from '@/classes/ForecastData';
import { get, set } from '@/utils/redis';
import ForecastService from '@/services/ForecastService';
import range from '@/utils/range';
import { add } from 'date-fns';
import titanOne from '@/fonts/TitanOneRegular';
import clsx from 'clsx';

export default function Forecast(props: ForecastComponentProps) {

	const forecast = useMemo(
		() => new ForecastData(props.forecast),
		[props.forecast],
	);

  return (
    <>
      <Head>
        <title>{`Forecast ${props.zipCode}`}</title>
        <meta name="description" content={`weather forecast for zip code ${props.zipCode}`} />
      </Head>

      <header className={clsx(styles.header, titanOne.variable)}>
        <nav><Link href="/">Forecast it</Link></nav>
      </header>

      <Main className={styles.layout}>
				<article className="card variant-green weather-current">
					<h1>
					{"Today's"} <br /> Weather
					</h1>

					<section className="temperatures">
						<div className="temperature-current">
							<span>Temp (°F)</span>
							{forecast.currentTemp}°
						</div>
						<div className="temperature-max">
							<span>High</span>
							{forecast.currentTempMax}°
						</div>
						<div className="temperature-min">
							<span>Low</span>
							{forecast.currentTempMin}°
						</div>
					</section>
				</article>

				<article className="card variant-green weather-metadata">
					<div className="metadata-item item-zip">
						<span>Zip Code</span>
						{props.zipCode}
					</div>
					<div className="metadata-item item-tz">
						<span>Timezone</span>
						{forecast.currentTimezone}
					</div>
					<div className="metadata-item item-time">
						<span>Updated at</span>
						{forecast.currentTime}
					</div>
					<div className="metadata-item item-cache">
						<span>Cache Status</span>
						{props.isCached ? "Hit" : "Miss"}
					</div>
				</article>

				<article className="card variant-green weather-extended">
					<h2>Extended Forecast</h2>

					{range({ min: 0, max: 7 }).map(dayOffset => {
						return (
							<table key={dayOffset} className="forecast-day" data-day={dayOffset}>
								<caption>Day {dayOffset + 1}</caption>
								<thead>
									<tr>
										<th scope="col">
										</th>
										{range({ min: 0, max: 7 }).map(hourOffset => {
											return (
												<th key={hourOffset} scope="col">
													+{hourOffset}
												</th>
											);
										})}
									</tr>
								</thead>
								<tbody>
								{[
									["Night", "00:00"],
									["Morning", "06:00"],
									["Afternoon", "12:00"],
									["Evening", "18:00"],
								].map((dayPeriod, periodIndex) => {
									return (
										<tr key={dayPeriod[0]}>
											<th scope="row">
												<span className="period-label">
													{dayPeriod[0]}
												</span>
												<span className="period-offset">
													+{dayPeriod[1]}
												</span>
											</th>
											{range({ min: 0, max: 7 }).map(hourOffset => {
												const hourlyCursor = dayOffset * 24 + periodIndex * 6 + hourOffset;
												const moment_date = forecast.utcDate;
												const now = new Date();
												const moment = now < moment_date
													? "past"
													: now < add(moment_date, { hours: 1 })
														? "present"
														: "future"
													;
												return (
													<td key={hourlyCursor} data-moment={moment}>
														{forecast.hourlyTemperature[hourlyCursor]}°
													</td>
												);
											})}
										</tr>
									);
								})}
								</tbody>
							</table>
						);
					})}
				</article>

      </Main>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {

	let zipCode = '';
	if (Array.isArray(context.query.zip_code)) {
		zipCode = context.query.zip_code[0];
	} else {
		zipCode = context.query.zip_code || '';
	}

	const forecaster = new ForecastService(zipCode);
	const forecast = await forecaster.call();
	const isCached = forecaster.isCached;

	return {
		props: { forecast, zipCode, isCached },
	}
}

type ForecastComponentProps = {
	forecast: any,
	zipCode: string,
	isCached: boolean,
}
