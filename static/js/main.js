function upvote(event, postId) {
    event.preventDefault();
    if (document.getElementById('user_authenticated').value === 'True') {
        const upvoteButton = document.getElementById(`upvote-button-${postId}`);
        const downvoteButton = document.getElementById(`downvote-button-${postId}`);
        const voteCount = document.getElementById(`votes-count-${postId}`);
        const csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;

        fetch(`/upvote/${postId}`, {
            method: "POST",
            headers: {
                "X-CSRFToken": csrfToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "upvoted": !upvoteButton.classList.contains("voted"),
                "downvoted": downvoteButton.classList.contains("voted"),
            })
        })
        .then((response) => response.json())
        .then((data) => {
            voteCount.innerHTML = data.score;
            if (data.upvoted) {
                upvoteButton.classList.add("voted");
                downvoteButton.classList.remove("voted");
            } else {
                downvoteButton.classList.remove("voted");
            }
        })
        .catch((error) => {
            console.error(error);
            alert("Could not upvote post.");
        });
    } else {
        window.location.replace('/login/?next=' + '&message=You must be logged in to upvote a post Gorl!');
    }
}




function downvote(event, postId) {
    event.preventDefault();
    if (document.getElementById('user_authenticated').value === 'True') {
        const upvoteButton = document.getElementById(`upvote-button-${postId}`);
        const downvoteButton = document.getElementById(`downvote-button-${postId}`);
        const voteCount = document.getElementById(`votes-count-${postId}`);
        const csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;

        fetch(`/downvote/${postId}`, {
            method: "POST",
            headers: {
                "X-CSRFToken": csrfToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "upvoted": upvoteButton.classList.contains("voted"),
                "downvoted": !downvoteButton.classList.contains("voted"),
            })
        })
        .then((response) => response.json())
        .then((data) => {
            voteCount.innerHTML = data.score;
            if (data.downvoted) {
                upvoteButton.classList.remove("voted");
                downvoteButton.classList.add("voted");
            } else {
                downvoteButton.classList.remove("voted");
            }
        })
        .catch((error) => {
            console.error(error);
            alert("Could not downvote post.");
        });
    } else {
        window.location.replace('/login/?next=' + '&message=You must be logged in to downvote a post Gorl!');
    }
}


document.addEventListener("DOMContentLoaded", function() {
    var select = document.getElementById("posts-per-page-select");
    var selectedValue = getCookiePost("posts_per_page");
    if(selectedValue){
        select.value = selectedValue;
    }
    select.addEventListener("change", function() {
        var selectedValue = select.options[select.selectedIndex].value;
        //store the selected value in a cookie
        document.cookie = "posts_per_page=" + selectedValue;
        //reload the page
        location.reload();
    });

    function getCookiePost(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }
});


document.addEventListener("DOMContentLoaded", function() {
    var select = document.getElementById("posts-per-page-selectt");
    var selectedValue = getCookieUserPost("posts_per_pagee");
    if(selectedValue){
        select.value = selectedValue;
    }
    select.addEventListener("change", function() {
        var selectedValue = select.options[select.selectedIndex].value;
        //store the selected value in a cookie
        document.cookie = "posts_per_pagee=" + selectedValue;
        //reload the page
        location.reload();
    });

    function getCookieUserPost(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }
});


document.addEventListener("DOMContentLoaded", function() {
    var select = document.getElementById("posts-per-page-selecttt");
    var selectedValue = getCookieSearchPost("posts_per_pageee");
    if(selectedValue){
        select.value = selectedValue;
    }
    select.addEventListener("change", function() {
        var selectedValue = select.options[select.selectedIndex].value;
        //store the selected value in a cookie
        document.cookie = "posts_per_pageee=" + selectedValue;
        //reload the page
        location.reload();
    });

    function getCookieSearchPost(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }
});


document.addEventListener("DOMContentLoaded", function() {
    var select = document.getElementById("posts-per-page-selectttt");
    var selectedValue = getCookieSearchUser("posts_per_pageeee");
    if(selectedValue){
        select.value = selectedValue;
    }
    select.addEventListener("change", function() {
        var selectedValue = select.options[select.selectedIndex].value;
        //store the selected value in a cookie
        document.cookie = "posts_per_pageeee=" + selectedValue;
        //reload the page
        location.reload();
    });

    function getCookieSearchUser(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }
});

const readMoreLinks = document.querySelectorAll(".read-more");

for (let i = 0; i < readMoreLinks.length; i++) {
  readMoreLinks[i].classList.add("like-button");

  readMoreLinks[i].addEventListener("click", function(e) {
    e.preventDefault();
    const body = document.querySelector(`#body_${this.dataset.id}`);
    if (this.textContent === "...Read more") {
      body.innerHTML = this.dataset.fullText;
      this.textContent = "...Read less";
    } else {
      body.innerHTML = this.dataset.truncatedText;
      this.textContent = "...Read more";
    }
  });
}

const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('id_files');

fileInput.addEventListener('change', handleFileInputChange);
dropArea.addEventListener('dragenter', handleDragEnter);
dropArea.addEventListener('dragleave', handleDragLeave);
dropArea.addEventListener('dragover', handleDragOver);
dropArea.addEventListener('drop', handleFileDrop);

function handleFileInputChange(e) {
  updateFileLabel(e.target.files[0].name);
  dropArea.classList.remove('bg-light');
  dropArea.classList.add('bg-suc');
}

function handleDragEnter(e) {
  e.preventDefault();
  dropArea.classList.remove('bg-suc');
  dropArea.classList.add('bg-light');
}

function handleDragLeave(e) {
  e.preventDefault();
  dropArea.classList.remove('bg-light');
}

function handleDragOver(e) {
  e.preventDefault();
  dropArea.classList.add('bg-light');
}

function handleFileDrop(e) {
  e.preventDefault();
  if (e.dataTransfer.files.length > 0) {
    const file = e.dataTransfer.files[0];
    fileInput.files = e.dataTransfer.files;
    updateFileLabel(file.name);
    dropArea.classList.remove('bg-light');
    dropArea.classList.add('bg-suc');
  }
}

function updateFileLabel(fileName) {
  fileLabel.innerText = fileName;
}
