const seededRandom = function (seed) {
  var m = 2 ** 35 - 31;
  var a = 185852;
  var s = seed % m;
  return function () {
    return (s = (s * a) % m) / m;
  };
};

const fetchAPI = function (date) {
  let result = [];
  const parsedDate = new Date(date);
  let random = seededRandom(parsedDate.getDate());

  for (let i = 17; i <= 23; i++) {
    if (random() < 0.5) {
      result.push(i + ":00");
    }
    if (random() < 0.5) {
      result.push(i + ":30");
    }
  }
  return result;
};
const submitAPI = function () {
  return true;
};

export async function fetchTimes(date) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fetchAPI(date));
    }, 500); // simulate network delay
  });
}

export function submitBooking(data) {
  console.log("Booking form submitted");
  return submitAPI(data);
}
