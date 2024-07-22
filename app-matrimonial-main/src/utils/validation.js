import {ERRORS} from '../labels/error';
import {Toast} from './native';
import {isValidPhoneNumber} from 'libphonenumber-js';

export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const CODE_REGEX = /^[0-9]{1,6}$/;

export const isValidatedSignup = ({
  name = '',
  email = '',
  password = '',
  phoneNumber = '',
  isChecked = false,
  countryCode = '+91',
  selectedCountry = 'IN',
}) => {
  if (!name) {
    Toast(ERRORS.enterName);
    return false;
    j;
  }
  if (name.length < 3) {
    Toast(ERRORS.nameLength);
    return false;
  }

  if (!email || EMAIL_REGEX.test(email) === false) {
    Toast(ERRORS.enterEmail);
    return false;
  }
  if (!phoneNumber) {
    Toast(ERRORS.phoneEnter);
    return false;
  }
  if (!isValidPhoneNumber(countryCode + phoneNumber, selectedCountry)) {
    Toast(ERRORS.phoneValidation);
    return false;
  }
  if (!password) {
    Toast(ERRORS.enterPassword);
    return false;
  }
  if (password.length < 8) {
    Toast(ERRORS.passwordValidation);
    return false;
  }
  if (!isChecked) {
    Toast(ERRORS.termsAndCondition);
    return false;
  }

  return true;
};

export const isValidatedLogin = ({email = '', password = ''}) => {
  if (!email) {
    Toast(ERRORS.email);
    return false;
  }
  if (!password) {
    Toast(ERRORS.enterPassword);
    return false;
  }
  return true;
};

export const isValidProfileData = ({
  age = '',
  height = '',
  gender = '',
  maritalStatus = '',
  dateOfBirth = '',
  religion = '',
  motherTongue = '',
  sect = '',
  city = '',
}) => {
  if (!age) {
    Toast(ERRORS.enterAge);
    return false;
  }
  if (isNaN(age) || age <= 0) {
    Toast(ERRORS.invalidAge);
    return false;
  }
  if (!height) {
    Toast(ERRORS.enterHeight);
    return false;
  }

  if (!gender) {
    Toast(ERRORS.enterGender);
    return false;
  }
  if (!maritalStatus) {
    Toast(ERRORS.enterMaritalStatus);
    return false;
  }
  if (!dateOfBirth) {
    Toast(ERRORS.enterDateOfBirth);
    return false;
  }
  if (!religion) {
    Toast(ERRORS.enterReligion);
    return false;
  }
  if (!motherTongue) {
    Toast(ERRORS.enterMotherTongue);
    return false;
  }
  if (!sect) {
    Toast(ERRORS.enterSect);
    return false;
  }
  if (!city) {
    Toast(ERRORS.enterCity);
    return false;
  }
  return true;
};


export const isValidProfileDetails = ({
  highestDegree = '',
  occupation = '',
  employedIn = '',
  annualIncome = '',
  workLocation = '',
}) => {
  if (!highestDegree) {
    Toast(ERRORS.selectDegree);
    return false;
  }

  if (!occupation) {
    Toast(ERRORS.selectOccupation);
    return false;
  }

  if (!employedIn) {
    Toast(ERRORS.enterEmployer);
    return false;
  }
  if (employedIn.length < 5) {
    Toast(ERRORS.employerLength);
    return false;
  }

  if (!annualIncome) {
    Toast(ERRORS.selectIncome);
    return false;
  }

  if (!workLocation) {
    Toast(ERRORS.selectWorkLocation);
    return false;
  }
  return true;
};
