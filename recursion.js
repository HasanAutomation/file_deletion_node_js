function countDown(number) {
  console.log(number);
  let newNumber = number - 1;

  if (newNumber > 0) countDown(newNumber);
}

countDown(10);
