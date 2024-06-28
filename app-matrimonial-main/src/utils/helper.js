export function searchItems(items, query) {
  const lowercasedQuery = query.toLowerCase();
  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(lowercasedQuery),
  );
  const errorMessage =
    filteredItems.length === 0 ? 'No items found matching your search.' : '';

  return {
    filteredItems,
    errorMessage,
  };
}

export function searchFunction(data, query) {
  query = query.toLowerCase();
  return data.filter(item => {
    // Implement your search logic here
    // For example, check if item.value or item.name includes the query
    return item.value.toLowerCase().includes(query) || item.name.toLowerCase().includes(query);
  });
}


export function getTimeDifference(notificationTimestamp) {
  const notificationDate = new Date(notificationTimestamp);
  const currentDate = new Date();
  const timeDifference = currentDate - notificationDate;

  const minutes = Math.floor(timeDifference / (1000 * 60));
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (days > 0) {
    if (days === 1) {
      return 'Yesterday';
    } else {
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dayIndex = notificationDate.getDay();
      return dayNames[dayIndex];
    }
  } else if (hours > 0) {
    return `${hours}h ago`;
  } else if (minutes > 0) {
    return `${minutes} min ago`;
  } else {
    return 'Just now';
  }
}

export function formatTimestamp(timestamp) {
  const date = new Date(Date.parse(timestamp));
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes}`;
}

export const isValidEmail = email => {
  // Regular expression for validating an Email
  const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

export const isValidPassword = password => {
  // Password must be at least 8 characters long and contain at least one digit, one uppercase letter, and one special character
  const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  return passwordRegex.test(password);
};
