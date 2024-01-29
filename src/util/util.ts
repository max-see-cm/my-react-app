export function convertCentToRM(amount: number) {
  let twoDecimal = amount / 100;
  return twoDecimal.toFixed(2);
}

export function convertRMStringtoCent(amount: string) {
  let centValue = parseFloat(amount) * 100;
  return centValue ? centValue : 0;
}

export function getFileName(url: string) {
  let subUrls: string[] = url.split("/");
  if (subUrls.length > 0) {
    return subUrls[subUrls.length - 1];
  } else {
    return "attachment1";
  }
}

export const getColorStatus = (status: string) => {
  switch (status) {
    case "PENDING_APPROVAL":
    case "Pending":
      return "#F0B64F";
      break;
    case "APPROVED":
    case "Approved":
      return "#04B220";
      break;
    case "REJECTED":
    case "Rejected":
      return "#E66558";
      break;
    case "WITHDRAWN":
    case "Withdrawn":
      return "#295576";
      break;
    default:
      return "#295576";
      break;
  }
};

export function prettifyStatusLabel(status: string) {
  switch (status) {
    case "PENDING_APPROVAL":
      return "Pending";
      break;
    default:
      const firstLetter = status.charAt(0).toUpperCase();
      const restOfWord = status.slice(1).toLowerCase();

      return firstLetter + restOfWord;
      break;
  }
}

export function getNotificationMessage(status: string) {
  switch (status) {
    case "PENDING_APPROVAL":
      return "Success update to pending status";
      break;
    case "APPROVED":
      return "Success approve claim";
      break;
    case "REJECTED":
      return "Success reject claim";
      break;
    case "WITHDRAWN":
      return "Success withdraw claim";
      break;
    default:
      return "";
      break;
  }
}

export function getNotificationLeaveMessage(status: string) {
  switch (status) {
    case "PENDING_APPROVAL":
      return "Successfully submit leave application";
      break;
    case "APPROVED":
      return "Success approve leave";
      break;
    case "REJECTED":
      return "Success reject leave";
      break;
    case "WITHDRAWN":
      return "Success withdraw leave";
      break;
    default:
      return "";
      break;
  }
}

export const getErrorMessageLogin = (statusCode: number) => {
  switch (statusCode) {
    case 401:
      return "Invalid Email address or password";
      break;
    case 500:
      return "Server Error. Please contact administrator";
      break;
    default:
      return "Error, please try again";
      break;
  }
};

export const getNoOfDays = (currentNoofDays: number, typeOfDay: string) => {
  let days = currentNoofDays;

  if (typeOfDay !== "full") {
    days -= 0.5;
  }

  return days;
};

export const encodeToBase64 = (inputString: string): string => {
  const encoded = btoa(inputString);
  return encoded;
};
