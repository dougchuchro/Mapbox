const addressForm = document.getElementById('address-form');
const address = document.getElementById('address');

// Send POST to API to add store
async function lookupAddress(e) {
  e.preventDefault();
  if (address.value === '') {
    alert('Please fill in fields');
  }
  const sendBody = {
    address: address.value
  };
  try {
    const res = await fetch('/api/v1/geocoder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendBody)
    });
    if (res.status === 400) { throw Error('Store already exists!'); }
    const data = await res.json();
    console.log(data);
//    alert(data.stringify() );
//    window.location.href = '/index.html';
  } catch (err) {
    alert(err);
    return;
  }
}

addressForm.addEventListener('submit', lookupAddress);
