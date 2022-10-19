//api url
const xhr = new XMLHttpRequest();
const url = "https://api.data.gov.sg/v1/transport/carpark-availability";

xhr.open("GET", url);
// xhr.setRequestHeader('2022-10-10T10%3A10%3A10', dateTime);
xhr.send();

xhr.onreadystatechange = function() {
    if (this.readyState===4 && this.status===200 ) {
        var data = JSON.parse(this.responseText);
        console.log(data)
        show(data)    
    }
}

function show(data) {
    const carpark = data.items[0].carpark_data;
    const smallLot = [], mediumLot = [], bigLot = [], largeLot = []

    carpark.forEach(cp => {
        // availableLots.push(cp.carpark_info[0].lots_available);   
        
        if (cp.carpark_info[0].total_lots <100) {
            cp.carpark_info[0]['size'] = "small";
            smallLot.push(cp)
        } else 
        if (cp.carpark_info[0].total_lots <300 && cp.carpark_info[0].total_lots >100) {
            cp.carpark_info[0]['size'] = "medium";
            mediumLot.push(cp)
        } else 
        if (cp.carpark_info[0].total_lots <400 && cp.carpark_info[0].total_lots >300) {
            cp.carpark_info[0]['size'] = "big";
            bigLot.push(cp)
        } else
        if (cp.carpark_info[0].total_lots > 400) {
            cp.carpark_info[0]['size'] = "large";
            largeLot.push(cp)
        }
    })

    // mapping for small carpark available lot numbers
    const smallLots = smallLot.map(lot => lot.carpark_info[0].lots_available )

    // filter for finding carparks that have min or max number of lots
    var smallMin = smallLot.filter(
        lot => (
            lot.carpark_info[0].lots_available == 0
    ))       
    var smallMax = smallLot.filter(
        lot => (
            lot.carpark_info[0].lots_available == Math.max(...smallLots )
    )) 
    // list out all carparks with minimum/maximum lots
    var smallCPMin = [], smallCPMax = [];
    for (let i=0; i<smallMin.length;i++) {
        smallCPMin.push(smallMin[i].carpark_number)
    }
    for (let i=0; i<smallMax.length;i++) {
        smallCPMax.push(smallMax[i].carpark_number)
    }

    // medium lots
    const mediumLots = mediumLot.map(lot => lot.carpark_info[0].lots_available )
    var mediumMin = mediumLot.filter(
        lot => (
            lot.carpark_info[0].lots_available == Math.min(...mediumLots )
    ))       
    var mediumMax = mediumLot.filter(
        lot => (
            lot.carpark_info[0].lots_available == Math.max(...mediumLots )
    )) 
    var mediumCPMin = [], mediumCPMax = [];
    for (let i=0; i<mediumMin.length;i++) {
        mediumCPMin.push(mediumMin[i].carpark_number)
    }
    for (let i=0; i<mediumMax.length;i++) {
        mediumCPMax.push(mediumMax[i].carpark_number)
    }

    //big lots
    const bigLots = bigLot.map(lot => lot.carpark_info[0].lots_available )
    var bigMin = bigLot.filter(
        lot => (
            lot.carpark_info[0].lots_available == Math.min(...bigLots )
    ))       
    var bigMax = bigLot.filter(
        lot => (
            lot.carpark_info[0].lots_available == Math.max(...bigLots )
    )) 
    var bigCPMin = [], bigCPMax = [];
    for (let i=0; i<bigMin.length;i++) {
        bigCPMin.push(bigMin[i].carpark_number)
    }
    for (let i=0; i<bigMax.length;i++) {
        bigCPMax.push(bigMax[i].carpark_number)
    }
    //large lots
    const largeLots = largeLot.map(lot => lot.carpark_info[0].lots_available )
    var largeMin = largeLot.filter(
        lot => (
            lot.carpark_info[0].lots_available == Math.min(...largeLots )
    ))       
    var largeMax = largeLot.filter(
        lot => (
            lot.carpark_info[0].lots_available == Math.max(...largeLots )
    )) 
    var largeCPMin = [], largeCPMax = [];
    for (let i=0; i<largeMin.length;i++) {
        largeCPMin.push(largeMin[i].carpark_number)
    }
    for (let i=0; i<largeMax.length;i++) {
        largeCPMax.push(largeMax[i].carpark_number)
    }
    console.log(largeLots)
    console.log(largeCPMax)

    let tab = 
    `<tr>
        <th> Carpark Category </th>
        <th> Highest/Lowest Available Lots </th>
        <th> Carpark Numbers </th>     
    </tr>
    <tr> 
        <td rowspan="2"> Small </td> 
        <td> ${Math.max(...smallLots)}</td>
        <td>${smallCPMin}</td>
    </tr>
    <tr>
        <td> ${Math.min(...smallLots)}</td>
        <td>${smallCPMax}</td>
    </tr>
    <tr> 
        <td rowspan="2"> Medium </td> 
        <td> ${Math.max(...mediumLots)}</td>
        <td>${mediumCPMin}</td>
    </tr>
    <tr>
        <td> ${Math.min(...mediumLots)}</td>
        <td>${mediumCPMax}</td>
    </tr>
    <tr> 
        <td rowspan="2"> Big </td> 
        <td> ${Math.max(...bigLots)}</td>
        <td>${bigCPMin}</td>
    </tr>
    <tr>
        <td> ${Math.min(...bigLots)}</td>
        <td>${bigCPMax}</td>
    </tr>
    <tr> 
        <td rowspan="2"> Large </td> 
        <td> ${Math.max(...largeLots)}</td>
        <td>${largeCPMin}</td>
    </tr>
    <tr>
        <td> ${Math.min(...largeLots)}</td>
        <td>${largeCPMax}</td>
</tr>
    `;
    
    document.getElementById("carPARK").innerHTML = tab;

          
}

// function tabulate(data) {
//     const carpark = data.items[0].carpark_data;
//     const availableLots = [];

//     for (let i=0; i<carpark.length;i++) {
//     availableLots.push(carpark[i].carpark_info[0].lots_available);   
//     }

//     availableLots.forEach( cp => {
//         if (cp.)
//     })

//     // console.log(Math.max(...availableLots));
//     const maxLot = Math.max(...availableLots)
//     const minLot = Math.min(...availableLots)


//     //construct table    
    
//     const carparkdiv = document.getElementById("sgcarpark");

//     const tableHeaders = ["Carpark Category", "Highest Lot", "Lowest Lot"];
//     const heading = document.createElement("h1");

//     heading.innerHTML = 








//     // let tab = 
//     // ` <tr> 
//     //     <th> CP Category </th>
//     //     <th> Highest Lots  </th>
//     //     <th> Lowest Lots  </th> 
//     //     </tr>`;
             
//     tab +=
//             // first row to set Size Category  
//             `<tr> 
//             <td> "Big Carpark" </td>
//             <td>${maxLot}</td> 
//             <td>${minLot}</td> 
//             </tr>`;
           
// }




// defining async func
// fetch(api_url)
//     .then((res) => {
//         if(response.ok) {
//             return res.json();
//         } else {
//             throw new Error("network response error");
//         }
//     })
//     .then(data => {
//         console.log(data);
//         // displayCarpark(data)
//     })
//     .catch( (error) => 
//     console.log("Fetch error", error)
//  ); 