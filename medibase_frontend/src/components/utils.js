export const formatDate = (date)=>{
   const tareekh = new Date(date).toLocaleDateString()
   const day = new Date(date).toLocaleString('en-us', {weekday:'long'})

   return day+", "+tareekh;

   
}