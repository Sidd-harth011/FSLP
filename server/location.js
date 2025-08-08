require('dotenv').config();
fetch(`https://ipinfo.io/json?token=` + process.env.IPINFO_TOKEN)
  .then(res => res.json())
  .then(data => {
    const loc = data.loc.split(',');
    console.log('Approximate Latitude:', loc[0]);
    console.log('Approximate Longitude:', loc[1]);
  });
