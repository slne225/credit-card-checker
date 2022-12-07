// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// This function tests if an array of numbers is valid using luhn algorithm

function validateCred(nums) {
    let arr = [] // items that match the logic below are pushed here to arr
    for (let i = nums.length -1; i >= 0; i--){     
      //nums.length-1 = odd and number <= 0 and number index = odd 
      if ((nums.length -1)%2 ===  1 && ((nums[i] * 2) - 9 <= 0) && i%2 === 0)
            {arr.push(nums[i] * 2)}
      //nums.length-1 = odd and number > 0 and number index = even
      else if ((nums.length -1)%2 ===  1 && ((nums[i] * 2) - 9 > 0) && i%2 === 0)
            {arr.push(nums[i] * 2 - 9)}
      //nums.length-1 =  odd and number index = even 
      else if ((nums.length -1)%2 ===  1 && i%2 === 1)
            {arr.push(nums[i])} 
      //nums.length-1 = even and number <= 0 and number index = odd
      else if ((nums.length-1)%2 ===  0 && ((nums[i] * 2) - 9 <= 0) && i%2 === 1)
            {arr.push(nums[i] * 2)}
      //num.length-1 = even and number > 0 and number index = odd
      else if ((nums.length-1)%2 === 0 && ((nums[i] * 2) - 9 > 0) && i%2 === 1) 
            {arr.push(nums[i] * 2 - 9)}
      //num.length-1 = even and number index is even
      else if ((nums.length-1)%2 === 0 && i%2 === 0)
            {arr.push(nums[i])}
      }
    // sums each digit packaged into arr from the for loop and checks if it is divisible by 10
    if (arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0) % 10 === 0) {
        return true // divisible by 10
    }
    else {
        return false // not divisible by 10
    }
  };

  //test run on all 15 arrays provided at the start of the project
  console.log('valid check:')
  console.log(validateCred(valid1))
  console.log(validateCred(valid2))
  console.log(validateCred(valid3))
  console.log(validateCred(valid4))
  console.log(validateCred(valid5))
  console.log('\ninvalid check:')
  console.log(validateCred(invalid1))
  console.log(validateCred(invalid2))
  console.log(validateCred(invalid3))
  console.log(validateCred(invalid4))
  console.log(validateCred(invalid5))
  console.log('\nmystery check:')
  console.log(validateCred(mystery1))
  console.log(validateCred(mystery2))
  console.log(validateCred(mystery3))
  console.log(validateCred(mystery4))
  console.log(validateCred(mystery5))

  // creates a new array of invalid credit card numbers
  function findInvalidCards(nestedArr){
    let invalidArr = [] // where invalid credit card numbers are pushed
    // checks a sub array of numbers (items) stored in an array (nestedArr)
    for (const item of nestedArr) {
      // item is not divisible by 10
      if (validateCred(item) === false){
        invalidArr.push(item)
      }
    }
    return invalidArr //outputs all the invalid credit cards stored in invalidArr
    }
  console.log('\nfindInvalidCards test run: \n',findInvalidCards(batch)) // test run function using batch variable from above

  // finds out which companies have issued invalid credit cards
  function idInvalidCardCompanies(arr){
    let cardCompanies = [] // stores companies who issued invalid credit card numbers
    let invalids = findInvalidCards(arr) // variable storing invalid credit card numbers from input array 
    for (let i = 0; i < invalids.length; i++){
      // first number of credit card = 3 and 'Amex' is not in cardCompanies
      if (invalids[i][0] === 3 && cardCompanies.indexOf('Amex') === -1)
        {cardCompanies.push('Amex')} // store the string 'Amex' in cardCompanies
      // first number of credit card = 4 and 'Visa' is not in cardCompanies 
      else if (invalids[i][0] === 4 && cardCompanies.indexOf('Visa') === -1)
        {cardCompanies.push('Visa')} // store the string 'Visa' in cardCompanies
      // first number of credit card = 5 and 'Mastercard' is not in cardCompanies
      else if (invalids[i][0] === 5 && cardCompanies.indexOf('Mastercard') === -1)
        {cardCompanies.push('Mastercard')} // store the string 'Mastercard' in cardCompanies
      // first number of credit card = 6 and 'Discover is not in cardCompanies
      else if (invalids[i][0] === 6 && cardCompanies.indexOf('Discover') === -1)
        {cardCompanies.push('Discover')} // store the string 'Discover' in cardCompanies
      else {'company not found'} // the first number of the credit card in not between 3-6
    }
    return cardCompanies // output is companies who issued invalid credit cards (no duplicates)
  }
  console.log('\nidInvalidCardCompanies test run:\n',idInvalidCardCompanies(batch)) // test run function using the batch array 