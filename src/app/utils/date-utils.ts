export function convertDate(date: string): string{
    const dateObject=new Date(date);
    return dateObject.toDateString()+" " +dateObject.toLocaleTimeString();
  }