let orders=JSON.parse(localStorage.getItem("orders"));


let count=1;


orders.forEach((e)=>{
    document.write(`
    <div class="accordion-item" style="width:50%;margin:0 auto;">
    <h2 class="accordion-header" id="flush-heading${count}">
  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${count}" aria-expanded="false" aria-controls="flush-collapse${count}">
    ORDER ID :${count}
  </button>
</h2>
<div id="flush-collapse${count}" class="accordion-collapse collapse" aria-labelledby="flush-heading${count}" data-bs-parent="#accordionFlushExample">
  <div class="accordion-body">
  <table style="width:50%">
        <thead style="border:1px solid">
           <tr>
              <th style="border:1px solid">#</th>
              <th style="border:1px solid">Name</th>
              <th style="border:1px solid">Price</th>
              <th style="border:1px solid">Units</th>
              <th style="border:1px solid">Total</th>
              
           </tr>           
        </thead>`);
        let total=0;
    e.forEach((a)=>{
        
        // console.log(a);
        // document.write(a+"<br />");
        document.write(`
        
            <tr>
                <td>${a[0]}</td>
                <td>${a[2]}</td>
                <td>${a[3]}&euro;</td>
                <td>${a[4]}</td>
                <td>${a[3]*a[4]}&euro;</td>
            </tr>
        `);
        total+=a[3]*a[4];
        
    })
    count++;
   document.write(`  
   <tr>
    <td></td>
    <td></td>
    <td></td>
    <td><h5>Total:</h5></td>
    <td><h5>${total}&euro;</h5></td>
   </tr>
   </table> </div>

   </div>
   </div>`);
})





// console.log(typeof(orders));
