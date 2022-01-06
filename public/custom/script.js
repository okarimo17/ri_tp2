async function APIFetch(endpoint, reqObject = {}, callback = () => { }) {
    let resp = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      ...reqObject,
    });
    let res = await resp.json();
    callback(res);
}
  
function formArrayToJson(form_data) {
    var object = {};
  
    form_data.forEach(({ name, value }) => {
      if (name.indexOf("type") != -1) name = "type";
      if (name.indexOf("sub") != -1) name = "sub";
      object[name] = value;
    });
    return object;
}
  
function NotifyResult({
    success = false,
    message = "Error Found Please Try Again",
    title = "Operation Result",
    }, cb = () => { }) {
        Swal.fire({
            title: title,
            text: message,
            icon: success ? "success" : "error",
        }).then(cb);
}
  
function NotifyError(message = "Error Found Please Try Again") {
    Swal.fire({
        title: "Error",
        text: message,
        icon: "error",
    });
}

  
async function showConfirmDialog(message, callback) {
    Swal.fire({
    title: "Are you sûr?",
    text: message || "All old cleaned files or index will be removed ",
    icon: "warning",
    showCancelButton: true,
    }).then(({ isConfirmed }) => {
    if (isConfirmed) {
        callback();
    }
    });
}