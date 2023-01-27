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
      <header>
        <nav><Link href="/">Forecast it</Link></nav>
      </header>
      <Main className={styles.layout}>
				<article className="card variant-green weather-current">
					<h1>
					{"Today's"} <br /> Weather
					</h1>
					<pre>
					{JSON.stringify(props.forecast, null, 2)}
					</pre>
					{/*
					<section className="temperatures">
						<div className="temperature-current">
							<span>Temp (°F)</span>
							<%= current_temp %>°
						</div>
						<div className="temperature-max">
							<span>High</span>
							<%= current_temp_max %>°
						</div>
						<div className="temperature-min">
							<span>Low</span>
							<%= current_temp_min %>°
						</div>
					</section>
				</article>

				<article className="card variant-green weather-metadata">
					<div className="metadata-item item-zip">
						<span>Zip Code</span>
						<%= zip_code %>
					</div>
					<div className="metadata-item item-tz">
						<span>Timezone</span>
						<%= current_timezone %>
					</div>
					<div className="metadata-item item-time">
						<span>Updated at</span>
						<%= current_time %>
					</div>
					<div className="metadata-item item-cache">
						<span>Cache Status</span>
						<%= cache_status %>
					</div>
				</article>

				<article className="card variant-green weather-extended">
					<h2>Extended Forecast</h2>

					<% Time.use_zone(current_timezone) do %>

					<% (0...7).each do |day_offset| %>
						<table className="forecast-day" data-day="<%= day_offset %>">
							<caption>Day <%= day_offset + 1 %></caption>
							<thead>
								<tr>
									<th scope="col">
									</th>
									<% (0...6).each do |hour_offset| %>
										<th scope="col">
											+<%= hour_offset %>
										</th>
									<% end %>
								</tr>
							</thead>
							<tbody>
								<% [
										["Night", "00:00"],
										["Morning", "06:00"],
										["Afternoon", "12:00"],
										["Evening", "18:00"],
									].each_with_index do |day_period, period_index| %>
									<tr>
										<th scope="row">
											<span className="period-label">
											<%= day_period[0] %>
											</span>
											<span className="period-offset">
											+<%= day_period[1] %>
											</span>
										</th>
										<% (0...6).each do |hour_offset| %>
											<% hourly_cursor = day_offset * 24 + period_index * 6 + hour_offset %>
											<td
												data-moment="<%=
													moment = ActiveSupport::TimeZone.new(current_timezone).parse(hourly_time[hourly_cursor])
													now = Time.current
													if now < moment
														"past"
													elsif now < (moment + 1.hour)
														"present"
													else
														"future"
													end
												%>"
											>
												<%= hourly_temperature[hourly_cursor] %>°
											</td>
										<% end %>
									</tr>
								<% end %>
							</tbody>
						</table>
					<% end %>
					<% end %>
				*/}
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
