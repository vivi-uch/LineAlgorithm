function calculate(algorithm) {
  const x1 = parseInt(document.getElementById("x1").value);
  const y1 = parseInt(document.getElementById("y1").value);
  const x2 = parseInt(document.getElementById("x2").value);
  const y2 = parseInt(document.getElementById("y2").value);

  let points = [];

  if (algorithm === "DDA") {
    points = DDA(x1, y1, x2, y2);
    document.getElementById("theadDDA").style.display = "table-header-group";
    document.getElementById("theadBresenham").style.display = "none";
    document.getElementById("theadMidpoint").style.display = "none";
  } else if (algorithm === "Bresenham") {
    points = bresenham(x1, y1, x2, y2);
    document.getElementById("theadDDA").style.display = "none";
    document.getElementById("theadMidpoint").style.display = "none";
    document.getElementById("theadBresenham").style.display =
      "table-header-group";
  } else if (algorithm === "MidPoint") {
    points = bresenham(x1, y1, x2, y2);
    document.getElementById("theadDDA").style.display = "none";
    document.getElementById("theadBresenham").style.display = "none";
    document.getElementById("theadMidpoint").style.display =
      "table-header-group";
  } else {
    // const resultTable = document.getElementById("resultTable");
    // resultTable.innerHTML = "";
    location.reload();
  }

  displayResults(points);
}

function DDA(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let steps = Math.max(Math.abs(dx), Math.abs(dy));
  let xIncrement = dx / steps;
  let yIncrement = dy / steps;

  let points = [];
  let x = x1;
  let y = y1;
  points.push({
    xp: x,
    yp: y,
    xp1: x,
    yp1: y,
  });
  for (let i = 0; i < steps; i++) {
    points.push({
      xp: "",
      yp: "",
      xp1: x + xIncrement,
      yp1: y + yIncrement,
    });
    x += xIncrement;
    y += yIncrement;
  }

  return points;
}

function bresenham(xk, yk, x2, y2) {
  let dx = Math.abs(x2 - xk);
  let dy = Math.abs(y2 - yk);
  let points = [];
  let pk = 2 * dy - dx;
  let xk1 = 0;
  let yk1 = 0;
  points.push({
    xp1: xk,
    yp1: yk,
    xp: "",
    yp: "",
  });

  while (xk1 < x2) {
    if (pk < 0) {
      pk1 = pk + 2 * dy;
      xk1 = xk + 1;
      yk1 = yk;
    } else {
      pk1 = pk + 2 * dy - 2 * dx;
      xk1 = xk + 1;
      yk1 = yk + 1;
    }
    xk = xk1;
    yk = yk1;

    points.push({
      xp: pk,
      yp: pk1,
      xp1: xk,
      yp1: yk,
    });
    pk = pk1;
  }

  return points;
}

function Midpoint(xk, yk, x2, y2) {
  let dx = Math.abs(x2 - xk);
  let dy = Math.abs(y2 - yk);
  let points = [];
  let dk = 2 * dy - dx;
  let dd = 2 * (dy - dx);
  let xk1 = 0;
  let yk1 = 0;
  points.push({
    xp1: xk,
    yp1: yk,
    xp: "",
    yp: "",
  });

  while (xk1 < x2) {
    if (dk < 0) {
      dk1 = dk + 2 * dy;
      xk1 = xk + 1;
      yk1 = yk;
    } else {
      dk1 = dk + dd;
      xk1 = xk + 1;
      yk1 = yk + 1;
    }
    xk = xk1;
    yk = yk1;

    points.push({
      xp: dk,
      yp: dk1,
      xp1: xk,
      yp1: yk,
    });
    dk = dk1;
  }

  return points;
}

function displayResults(points) {
  const resultBody = document.getElementById("resultBody");
  resultBody.innerHTML = "";

  points.forEach((point) => {
    const row = document.createElement("tr");
    row.innerHTML = `
              <td>${point.xp}</td>
              <td>${point.yp}</td>
              <td>${point.xp1}</td>
              <td>${point.yp1}</td>
              <td>(${Math.round(point.xp1)}, ${Math.round(point.yp1)})</td>
          `;
    resultBody.appendChild(row);
  });
}
