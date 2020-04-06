

// var today = new Date();

// var yesterday = new Date(today);
// yesterday.setDate(yesterday.getDate() - 1);

// var dd = String(today.getDate());
// var mm = String(today.getMonth() + 1); //January is 0!
// var yyyy = today.getFullYear();
// today =  yyyy + '-' + mm + '-' + dd;

// var dd = String(yesterday.getDate());
// var mm = String(yesterday.getMonth() + 1); //January is 0!
// var yyyy = yesterday.getFullYear();
// yesterday =  yyyy + '-' + mm + '-' + dd;

// var news = document.getElementsByClassName("country-list")[0];
// var globalCases = document.getElementsByClassName("global-cases")[0];

// fetch("https://pomber.github.io/covid19/timeseries.json")
//   .then(response => response.json())
//   .then(timeSeriesData => {
//     var totalConfirmed = 0;
//     var totalDeaths = 0;
//     for (var key in timeSeriesData){
//         var recoveredPeople;
//         recoveredPeople = 0;
      
//         for (var obj in timeSeriesData[key]){
//             if (timeSeriesData[key][obj]["recovered"] === undefined){
               
//             } else {
//                 if (recoveredPeople < timeSeriesData[key][obj]["recovered"] ){
//                     recoveredPeople = timeSeriesData[key][obj]["recovered"]
//                 }
//             }
            
           
//             if (timeSeriesData[key][obj]["date"] === today) {
//                 // totalConfirmed += timeSeriesData[key][obj]["confirmed"];
//                 // totalDeaths += timeSeriesData[key][obj]["deaths"];
                
//                 var div = document.createElement('div');
//                 div.className = 'container rounded ';
//                     var h4 = document.createElement('h4');
//                     h4.innerHTML = key ;
//                     div.appendChild(h4);
//                     var innerTable = document.createElement('table');
//                     innerTable.className = 'table rounded table-borderless table-light';
//                         var thead1 = document.createElement('thead');
//                             var tr = document.createElement('tr');
//                             var confirmed = document.createElement('th');
//                             confirmed.innerHTML = "Confirmed: " + timeSeriesData[key][obj]["confirmed"];
//                             confirmed.bgColor ="#0275d8"
//                             var death = document.createElement('th');
//                             death.innerHTML = "Deaths: " + timeSeriesData[key][obj]["deaths"];
//                             death.bgColor ="#d9534f"
//                             tr.appendChild(confirmed);
//                             tr.appendChild(death);
//                         thead1.appendChild(tr);
//                         var tbody = document.createElement('thead');
//                             var tr = document.createElement('tr');
//                             var recovered = document.createElement('th');
//                             recovered.innerHTML = "Recovered: " +  recoveredPeople;
//                             recovered.bgColor ="#5cb85c"
//                             var active = document.createElement('th');
//                             active.innerHTML = "Active: " + (timeSeriesData[key][obj]["confirmed"] -
//                                                              timeSeriesData[key][obj]["deaths"] - recoveredPeople) ;
//                             active.bgColor ="#f0ad4e"
//                             tr.appendChild(recovered);
//                             tr.appendChild(active);
//                         tbody.appendChild(tr);
//                     innerTable.appendChild(thead1)
//                     innerTable.appendChild(tbody)
//                 div.appendChild(innerTable);
//             news.appendChild(div);
//             news.appendChild(document.createElement('br'));
//             } else {
              
                
//                 if (timeSeriesData[key][obj]["date"] === yesterday) {
//                     totalConfirmed += timeSeriesData[key][obj]["confirmed"];
//                     totalDeaths += timeSeriesData[key][obj]["deaths"];
                    
//                     var div = document.createElement('div');
//                     div.className = 'container rounded ';
//                         var h4 = document.createElement('h4');
//                         h4.innerHTML = key ;
//                         div.appendChild(h4);
//                         var innerTable = document.createElement('table');
//                         innerTable.className = 'table rounded table-borderless table-light';
//                             var thead1 = document.createElement('thead');
//                                 var tr = document.createElement('tr');
//                                 var confirmed = document.createElement('th');
//                                 confirmed.innerHTML = "Confirmed: " + timeSeriesData[key][obj]["confirmed"];
//                                 confirmed.bgColor ="#0275d8"
//                                 var death = document.createElement('th');
//                                 death.innerHTML = "Deaths: " + timeSeriesData[key][obj]["deaths"];
//                                 death.bgColor ="#d9534f"
//                                 tr.appendChild(confirmed);
//                                 tr.appendChild(death);
//                             thead1.appendChild(tr);
//                             var tbody = document.createElement('thead');
//                                 var tr = document.createElement('tr');
//                                 var recovered = document.createElement('th');
//                                 recovered.innerHTML = "Recovered: " +  recoveredPeople;
//                                 recovered.bgColor ="#5cb85c"
//                                 var active = document.createElement('th');
//                                 active.innerHTML = "Active: " + (timeSeriesData[key][obj]["confirmed"] -
//                                                                  timeSeriesData[key][obj]["deaths"] - recoveredPeople) ;
//                                 active.bgColor ="#f0ad4e"
                                
//                                 tr.appendChild(recovered);
//                                 tr.appendChild(active);
//                             tbody.appendChild(tr);
//                         innerTable.appendChild(thead1)
//                         innerTable.appendChild(tbody)
//                     div.appendChild(innerTable);
//                 news.appendChild(div);
//                 news.appendChild(document.createElement('br'));
//             }
//         }
//         }
//     }
//     var totalConfirmedDiv = document.createElement('div');
//     totalConfirmedDiv.className = 'col';
//     totalConfirmedDiv.innerHTML = "Total Confirmed: " + totalConfirmed
//     globalCases.appendChild(totalConfirmedDiv);
//     var totalDeathDiv = document.createElement('div');
//     totalDeathDiv.className = 'col';
//     totalDeathDiv.innerHTML = "Total Deaths: " + totalDeaths
//     globalCases.appendChild(totalDeathDiv);
//   })