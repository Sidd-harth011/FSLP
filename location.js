fetch('https://ipinfo.io/json?token=3889ac530c8876')
  .then(res => res.json())
  .then(data => {
    const loc = data.loc.split(',');
    console.log('Approximate Latitude:', loc[0]);
    console.log('Approximate Longitude:', loc[1]);
  });
