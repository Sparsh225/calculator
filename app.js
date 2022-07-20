document.getElementById('loan-form').addEventListener('submit',function(e){
    //hide results
    document.getElementById('results').style.display='none';

    //show loader
    document.getElementById('loading').style.display='block';

   setTimeout(calculateResults,2000);

    e.preventDefault();
});

function calculateResults(e){
    console.log("subminting....");
    //UI variables
    const amount=document.getElementById('amount');
    const interest=document.getElementById('interest');
    const years=document.getElementById('years');
    const monthlypayment=document.getElementById('monthly-payment');
    const totalpayment=document.getElementById('total-payment');
    const totalinterest=document.getElementById('total-interest');

    const principal=parseFloat(amount.value);
    const calculateinterest=parseFloat(interest.value)/100/12;
    const calculatedpayments=parseFloat(years.value)*12;

    //compute monthly payments
    const x=Math.pow(1+calculateinterest,calculatedpayments);
    const monthly=(principal*x*calculateinterest)/(x-1);

    if(isFinite(monthly)){
        monthlypayment.value=monthly.toFixed(2);
        totalpayment.value=(monthly*calculatedpayments).toFixed(2);
        totalinterest.value=((monthly*calculatedpayments)-principal).toFixed(2);

        //show results
        document.getElementById('results').style.display='block';

        //hide
        document.getElementById('loading').style.display='none';
    }else{
        showError("please check your number");
    }
}

//show error
function showError(error){
    //create a div
    const errordiv=document.createElement('div');

    //get elements
    const card=document.querySelector('.card');
    const heading=document.querySelector('.heading');

    //add div
    errordiv.className='alert alert-danger';

    //create text node and append to div
    errordiv.appendChild(document.createTextNode(error))

    //insert error above heading
    card.insertBefore(errordiv,heading);

    //clear error after 3 sec
    setTimeout(clearError,3000);
}

//clear error
function clearError(){
    document.querySelector('.alert').remove();
}