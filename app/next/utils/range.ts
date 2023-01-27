export default function range({
  min,
  max,
  step = 1,
  inclusive = false,
} : {
  min: number,
  max: number,
  step?: number,
  inclusive?: boolean,
}) {
  let arr = [];

  for (
    let i = min;
    inclusive ? i <= max : i < max;
    i += step
  ) {
    arr.push(i);
  }

  return arr;
}
