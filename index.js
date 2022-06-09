(async function () {
  $(document).ready(function () {
    let drawer = $("#plotNav");
    drawer.empty();

    drawer.append(`<h2 class="sidenav-title">Data</h2>`);
    drawer.append(
      `<ion-icon name="close-outline" class="closebtn" onclick="closeNav('plotNav')"></ion-icon>`
    );

    datasets = {};

    $.getJSON("./datasets/config.json", function (data) {
      $.each(data, function (key, entry) {
        drawer.append(
          $("<a></a>")
            .attr("onclick", `createDatasetDrawer('${JSON.stringify(entry)}}')`)
            .text(entry.parameter_longName)
        );
      });
      createDefaultDrawer(data);
    });
  });
})();

function createDefaultDrawer(data) {
  defaultData = data[0];
  $(document).ready(function () {
    let drawer = $("#plotNav");
    let datasetId = defaultData.parameter_longName.replaceAll(" ", "-");
    drawer
      .after(
        $("<div></div>")
          .attr({
            id: datasetId,
            class: "sidenav",
          })
          .append(
            `<h2 class="sidenav-title">${defaultData.parameter_longName}</h2>`
          )
          .append(
            `<ion-icon name="close-outline" class="closebtn" onclick="closeNav('${datasetId}')"></ion-icon>`
          )
      )
      .after(
        defaultData.category.forEach((dataset) => {
          $(`#${datasetId}`).append(
            $("<a></a>")
              .text(dataset.dataset_shortTitle)
              .attr(
                "onclick",
                `retrieveCSV('${defaultData.parameter_longName}','${dataset.dataset_shortTitle}')`
              )
          );
        })
      )
      .after(openNav(`${datasetId}`));
    let firstDataset = defaultData.category[0].dataset_shortTitle;
    setDefault(defaultData.parameter_longName, firstDataset);
  });
}

function createDatasetDrawer(payload) {
  const data = JSON.parse(payload.slice(0, -1));
  $(document).ready(function () {
    let drawer = $("#plotNav");
    let datasetId = data.parameter_longName.replaceAll(" ", "-");
    drawer
      .after(
        $("<div></div>")
          .attr({
            id: datasetId,
            class: "sidenav",
          })
          .append(`<h2 class="sidenav-title">${data.parameter_longName}</h2>`)
          .append(
            `<ion-icon name="close-outline" class="closebtn" onclick="closeNav('${datasetId}')"></ion-icon>`
          )
      )
      .after(
        data.category.forEach((dataset) => {
          $(`#${datasetId}`).append(
            $("<a></a>")
              .text(dataset.dataset_shortTitle)
              .attr(
                "onclick",
                `retrieveCSV('${data.parameter_longName}','${dataset.dataset_shortTitle}')`
              )
          );
        })
      )
      .after(openNav(`${datasetId}`));
    //for each function to remove dataset category div duplicates
    $(`#${datasetId}`).each(function () {
      let $ids = $("[id=" + this.id + "]");
      if ($ids.length > 1) {
        $ids.not(":first").remove();
      }
    });
  });
}

/* Set the width of the side navigation to 250px */
function openNav(id) {
  document.getElementById(id).style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav(id) {
  document.getElementById(id).style.width = "0";
}

function closePlot(id) {
  document.getElementById(id).style.width = "0";
  document.getElementById("plotButtonContainer").style.visibility = "hidden";
  document.getElementById("plot-openbtn").style.visibility = "visible";
}

function openPlot(id) {
  let screen = window.matchMedia("(max-height: 800px)");
  if (screen.matches) {
    document.getElementById(id).style.width = "1170px";
    document.getElementById(id).style.height = "600px";
  } else {
    document.getElementById(id).style.width = "1650px";
    document.getElementById(id).style.height = "750px";
  }
  document.getElementById("plotButtonContainer").style.visibility = "visible";
  document.getElementById("plot-closebtn").style.visibility = "visible";
  document.getElementById("plot-openbtn").style.visibility = "hidden";
}
