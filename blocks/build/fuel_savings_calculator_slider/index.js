(()=>{"use strict";var e,a={874:()=>{const e=window.wp.blocks,a=window.wp.element,i=(window.wp.i18n,window.wp.blockEditor),n=window.ReactJSXRuntime,s=JSON.parse('{"UU":"create-block/fuel-savings-calculator-slider"}');(0,e.registerBlockType)(s.UU,{edit:function(){return(0,a.useEffect)((()=>{jQuery(document).ready((function(e){var a,i=e("body").find("#fuel-savings-calculator"),n=0,s=0,l=function(){var i=parseInt(e("#estimated-gallons-per-fill-input").val()),l=parseInt(e("#number-of-units-input").val()),r=parseInt(e("#number-of-operators-input").val()),t=parseInt(e("#hourly-rate-input").val()),o=parseInt(e("#round-trip-per-fueling-input").val()),d=parseInt(e("#frequency-of-fueling-input").val());s=i*l*d*52,a=(n=t/60)*o*r*l*d*52;var u=i*l*d*52/12;u=Math.round(u);var c=o*r*l*d/60;c=Math.round(c);var p=l*o*d/60;p>0&&(p=p.toLocaleString("en-US",{maximumFractionDigits:2}),e("#lost-assets-and-labor-hours").text(p));var v=n*o*r*l*d;v="$"+(v=Math.round(v)).toLocaleString(),e("#labor-savings-per-week").text(v);var h="$0";s>0&&a>0&&(h="$"+(h=a/s).toLocaleString("en-US",{maximumFractionDigits:2}),e("#every-gallon-you-pump-costs-an-additional").html("<span style='color: #ce5353;'>+</span>"+h)),a="$"+(a=Math.round(a)).toLocaleString("en-US",{maximumFractionDigits:2}),e("#estimated-savings-annually").text(a);var m={number_of_operators:r,number_of_units_in_fleet:l,frequency_of_fueling:d,round_trip_per_fueling:o,estimated_gallons_per_fill:i,average_hourly_rate:t,every_gallon_you_pump_cost_an:h,estimated_gallons_consumed_per_week:(u/7).toLocaleString("en-US",{maximumFractionDigits:2}),man_hours_allocated_to_fueling_per_week:c,lost_asset_production_hours_per_week:p,estimated_cost_of_self_fueling_per_week:v,yearly_fuel_savings:a};e("div.fuel-savings-calculator-wrapper").attr("data-calculator",encodeURIComponent(JSON.stringify(m)))};i.find('input[type="range"]').rangeslider({polyfill:!1,onInit:function(){l()},onSlide:function(a,i){var n=this.$element.attr("id");n&&e("#"+n+"-input").val(i),l()},onSlideEnd:function(e,a){}}),i.find('input[type="text"]').on("keyup",(function(){var a=e(this).attr("id"),i=parseInt(this.value);if(void 0!==i)switch(a){case"estimated-gallons-per-fill-input":e("#estimated-gallons-per-fill").val(i).change();break;case"number-of-units-input":e("#number-of-units").val(i).change();break;case"number-of-operators-input":e("#number-of-operators").val(i).change();break;case"hourly-rate-input":e("#hourly-rate").val(i).change();break;case"round-trip-per-fueling-input":e("#round-trip-per-fueling").val(i).change();break;case"frequency-of-fueling-input":e("#frequency-of-fueling").val(i).change()}}))}))}),[]),(0,n.jsxs)("div",{class:"fuel-savings-calculator-wrapper",...(0,i.useBlockProps)(),children:[(0,n.jsxs)("div",{id:"fuel-savings-calculator",children:[(0,n.jsxs)("div",{class:"row",children:[(0,n.jsxs)("div",{class:"label",children:["Number Of Units In Fleet",(0,n.jsx)("small",{children:"(Total Vehicles)"}),(0,n.jsx)("div",{class:"help-tip",children:(0,n.jsx)("p",{children:"How many vehicles do you have in your fleet? Include gas and diesel."})})]}),(0,n.jsx)("div",{class:"range-slider",children:(0,n.jsx)("input",{id:"number-of-units",type:"range",min:"0",max:"80",step:"1",value:"17","data-orientation":"horizontal"})}),(0,n.jsx)("div",{class:"range-value",children:(0,n.jsx)("input",{id:"number-of-units-input",type:"text",size:"4",min:"20",max:"1500",value:"17"})})]}),(0,n.jsxs)("div",{class:"row",children:[(0,n.jsxs)("div",{class:"label",children:["Frequency Of Fueling",(0,n.jsx)("small",{children:"(Days)"}),(0,n.jsx)("div",{class:"help-tip",children:(0,n.jsx)("p",{children:"On average, how many days per week are you fueling your fleet?"})})]}),(0,n.jsx)("div",{class:"range-slider",children:(0,n.jsx)("input",{id:"frequency-of-fueling",type:"range",min:"0",max:"14",step:"1",value:"6","data-orientation":"horizontal"})}),(0,n.jsx)("div",{class:"range-value",children:(0,n.jsx)("input",{id:"frequency-of-fueling-input",type:"text",size:"4",min:"20",max:"1500",value:"6"})})]}),(0,n.jsxs)("div",{class:"row",children:[(0,n.jsxs)("div",{class:"label",children:["Estimated Gallons Per Fill",(0,n.jsx)("div",{class:"help-tip",children:(0,n.jsx)("p",{children:"On average, how many gallons are you pumping into each vehicle?"})})]}),(0,n.jsx)("div",{class:"range-slider",children:(0,n.jsx)("input",{id:"estimated-gallons-per-fill",type:"range",min:"0",max:"100",step:"1",value:"29","data-orientation":"horizontal"})}),(0,n.jsx)("div",{class:"range-value",children:(0,n.jsx)("input",{id:"estimated-gallons-per-fill-input",type:"text",size:"4",min:"20",max:"1500",value:"29"})})]}),(0,n.jsxs)("div",{class:"row",children:[(0,n.jsxs)("div",{class:"label",children:["Round-Trip Per Fueling",(0,n.jsx)("small",{children:"(Minutes)"}),(0,n.jsx)("div",{class:"help-tip",children:(0,n.jsx)("p",{children:"How many minutes does it take to drive to the fuel station, fill up, and drive back?"})})]}),(0,n.jsx)("div",{class:"range-slider",children:(0,n.jsx)("input",{id:"round-trip-per-fueling",type:"range",min:"0",max:"60",step:"1",value:"39","data-orientation":"horizontal"})}),(0,n.jsx)("div",{class:"range-value",children:(0,n.jsx)("input",{id:"round-trip-per-fueling-input",type:"text",size:"4",min:"20",max:"1500",value:"39"})})]}),(0,n.jsxs)("div",{class:"row",children:[(0,n.jsxs)("div",{class:"label",children:["Number Of Operators",(0,n.jsx)("div",{class:"help-tip",children:(0,n.jsx)("p",{children:"How many employees are typically in the vehicle?"})})]}),(0,n.jsx)("div",{class:"range-slider",children:(0,n.jsx)("input",{id:"number-of-operators",type:"range",min:"0",max:"10",step:"1",value:"2","data-orientation":"horizontal"})}),(0,n.jsx)("div",{class:"range-value",children:(0,n.jsx)("input",{id:"number-of-operators-input",type:"text",size:"4",min:"20",max:"1500",value:"2"})})]}),(0,n.jsxs)("div",{class:"row",children:[(0,n.jsxs)("div",{class:"label",children:["Average Hourly Rate",(0,n.jsx)("div",{class:"help-tip",children:(0,n.jsx)("p",{children:"What’s the average hourly rate? Include burden, insurance, and vacation."})})]}),(0,n.jsx)("div",{class:"range-slider",children:(0,n.jsx)("input",{id:"hourly-rate",type:"range",min:"0",max:"50",step:"1",value:"24","data-orientation":"horizontal"})}),(0,n.jsx)("div",{class:"range-value",children:(0,n.jsx)("input",{id:"hourly-rate-input",type:"text",size:"4",min:"20",max:"1500",value:"24"})})]})]}),(0,n.jsx)("span",{className:"heading-text",children:"ESTIMATED YEARLY SAVINGS WITH FUEL LOGIC:"}),(0,n.jsx)("span",{id:"estimated-savings-annually",children:"$0"}),(0,n.jsx)("span",{class:"heading-text",children:"ESTIMATED WEEKLY COST WITHOUT FUEL LOGIC:"}),(0,n.jsxs)("div",{class:"estimated-savings",children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("span",{className:"computed-value",id:"lost-assets-and-labor-hours",children:"0"}),"Hours Lost Per Week",(0,n.jsx)("br",{}),(0,n.jsx)("small",{children:"This is the time your fleet is not on the road. Lost Assets & Labor Hours Per Week"})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("span",{className:"computed-value",id:"labor-savings-per-week",children:"$0"}),"Labor Cost Per Week",(0,n.jsx)("br",{}),(0,n.jsx)("small",{children:"This is how much you pay your employee's to fill up your equipment"})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("span",{className:"computed-value",id:"every-gallon-you-pump-costs-an-additional",children:"$0"}),"Added Cost Per Gallon",(0,n.jsx)("br",{}),(0,n.jsx)("small",{children:"Every gallon you pump (XXXX gallons per week) costs an additional $XX.XX per gallon"})]})]})]})}})}},i={};function n(e){var s=i[e];if(void 0!==s)return s.exports;var l=i[e]={exports:{}};return a[e](l,l.exports,n),l.exports}n.m=a,e=[],n.O=(a,i,s,l)=>{if(!i){var r=1/0;for(u=0;u<e.length;u++){i=e[u][0],s=e[u][1],l=e[u][2];for(var t=!0,o=0;o<i.length;o++)(!1&l||r>=l)&&Object.keys(n.O).every((e=>n.O[e](i[o])))?i.splice(o--,1):(t=!1,l<r&&(r=l));if(t){e.splice(u--,1);var d=s();void 0!==d&&(a=d)}}return a}l=l||0;for(var u=e.length;u>0&&e[u-1][2]>l;u--)e[u]=e[u-1];e[u]=[i,s,l]},n.o=(e,a)=>Object.prototype.hasOwnProperty.call(e,a),(()=>{var e={583:0,863:0};n.O.j=a=>0===e[a];var a=(a,i)=>{var s,l,r=i[0],t=i[1],o=i[2],d=0;if(r.some((a=>0!==e[a]))){for(s in t)n.o(t,s)&&(n.m[s]=t[s]);if(o)var u=o(n)}for(a&&a(i);d<r.length;d++)l=r[d],n.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return n.O(u)},i=self.webpackChunkblocks=self.webpackChunkblocks||[];i.forEach(a.bind(null,0)),i.push=a.bind(null,i.push.bind(i))})();var s=n.O(void 0,[863],(()=>n(874)));s=n.O(s)})();