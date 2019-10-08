// Set Up Space
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

// Create SVG Wrapper
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("data.csv").then(function(healthData) {
  healthData.forEach(function(data){
    data.state = +data.state;
    data.poverty = +data.poverty;
    data.age = +data.age;
    data.income = +data.income;
    data.healthcare = +data.healthcare;
    data.obesity = +data.obesity;
    data.smokes = +data.smokes;
  });

  // Scaling
  xScale1 = d3.scaleLinear()
    .domain([d3.min(healthData, d=>d.age), d3.max(healthData, d=>d.age)])
    .range([0, width]);
  yScale1 = d3.scaleLinear()
    .domain([d3.min(healthData, d=>d.poverty), d3.max(healthData, d=>d.povery)])
    .range([height, 0]);
    
  // xScale2 = d3.scaleLinear()
  //   .domain([d3.min(healthData, d=>d.age), d3.max(healthData, d=>d.age)])
  //   .range([0, width]);
  // yScale2 = d3.scaleLinear()
  //   .domain([d3.min(healthData, d=>d.obesity), d3.max(healthData, d=>d.obesity)])
  //   .range([height, 0]);

  // xScale3 = d3.scaleLinear()
  //   .domain([d3.min(healthData, d=>d.age), d3.max(healthData, d=>d.age)])
  //   .range([0, width]);
  // yScale3 = d3.scaleLinear()
  //   .domain([d3.min(healthData, d=>d.smokes), d3.max(healthData, d=>d.smokes)])
  //   .range([height, 0]);
  
  // xScale4 = d3.scaleLinear()
  //   .domain([d3.min(healthData, d=>d.age), d3.max(healthData, d=>d.age)])
  //   .range([0, width]);
  // yScale4 = d3.scaleLinear()
  //   .domain([d3.min(healthData, d=>d.healthcare), d3.max(healthData, d=>d.healthcare)])
  //   .range([height, 0]);

  // xScale5 = d3.scaleLinear()
  //   .domain([d3.min(healthData, d=>d.income), d3.max(healthData, d=>d.income)])
  //   .range([0, width]);
  // yScale5 = d3.scaleLinear()
  //   .domain([d3.min(healthData, d=>d.obesity), d3.max(healthData, d=>d.obesity)])
  //   .range([height, 0]);
  
  // xScale6 = d3.scaleLinear()
  //   .domain([d3.min(healthData, d=>d.income), d3.max(healthData, d=>d.income)])
  //   .range([0, width]);
  // yScale6 = d3.scaleLinear()
  //   .domain([d3.min(healthData, d=>d.smokes), d3.max(healthData, d=>d.smokes)])
  //   .range([height, 0]);

  // Create Axis
  var bottomAxis = d3.axisBottom(xScale1);
  var leftAxis = d3.axisLeft(yScale1);

  chartGroup.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(bottomAxis);

  chartGroup.append("g")
  .call(leftAxis);

  // Add scatter points
  chartGroup.append('g')
  .selectAll("dot")
  .data(healthData)
  .enter()
  .append("dot")
    .attr("cx", d=>xScale1(d.age))
    .attr("cy", d=> yScale1(d.poverty))
    .attr("r", 10)
    .style("fill", "viridis")
    .attr("opacity", ".5");

  // ToolTip
  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.state}<br>Median Age: ${d.age}<br>Poverty %: ${d.poverty}`);
    });
  
  chartGroup.call(toolTip);
  
  circlesGroup.on("click", function(data) {
    toolTip.show(data, this);
  })
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  // Create Labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Poverty Percentage");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Age");

  }).catch(function(error) {
    console.log(error);
  });
