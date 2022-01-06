async function APIFetch(endpoint, reqObject = {}, callback = () => { }) {
    let resp = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body:JSON.stringify(reqObject),
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



function handleClickListEvaluates(){

    let items = document.querySelectorAll('ul.list-group.mt-4 li')
    let evaluate_btn = document.getElementById('evaluate')
    let selected = []
    items.forEach(function(item){    
        item.addEventListener('click', function(item){
            let name =this.getAttribute('--data-name')
            if(selected.indexOf(name)==-1){
                this.classList.add('bg-success')
                this.classList.add('text-white')
                selected.push(name)
            }else {
                this.classList.remove('bg-success')
                this.classList.remove('text-white')
                const index = selected.indexOf(name);
                if (index > -1) {
                    selected.splice(index, 1);
                }
            }
        });
    })

    evaluate_btn.onclick = function(){
        if(2>selected.length){
            alert('you have to select at least two files to evaluate')
        }else {


              Swal.fire({
                title: 'Evaluating these files will take some time is that ok ?',
                preConfirm: () => {
                  return   APIFetch('/evaluate',{files:selected},function(res){
                        let {result} = res
                        console.log('response',res)

                        Swal.fire({
                            title: `Evaluating Result`,
                            icon: 'success',
                            html: result,                          
                        })

                    })
                },
                allowOutsideClick: () => !Swal.isLoading()
              })
 
              

              

        }
    }
}