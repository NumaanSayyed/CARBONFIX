export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

export const getWithExpirationCheck = (key: string) => {
  const dataString = localStorage.getItem(key);
  if (!dataString) return null;
  const data = JSON.parse(dataString);
  const currentTime = new Date().getTime();
  if (currentTime > data.expirationTime) {
    localStorage.removeItem(key);
    return null;
  }
  return data.value;
};

export const apiResponse = (message: string | null,color:string| null ) => {
  const successDiv = document.createElement("div");
    successDiv.className =
      `fixed bottom-4 right-4 ${color} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up`;
    successDiv.textContent = message ;
    document.body.appendChild(successDiv);
    setTimeout(() => successDiv.remove(), 3000);
}