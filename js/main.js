// listen for form submit event and call the saveBookmark function

document.getElementById('myForm').addEventListener('submit',saveBookmark);

// save bookmark function

function saveBookmark(e){

    var siteName = document.getElementById('siteName').value;

    var siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName,siteUrl)){
        return false;
    }
    // put value in a bookmark object
    var bookmark = {
        name:siteName,
        url:siteUrl
    };

    // check if localStorage is empty before saving new bookmark

    if(localStorage.getItem('bookmarks') === null){

        var bookmarkArray = [];
        bookmarkArray.push(bookmark);

        localStorage.setItem('bookmarks',JSON.stringify(bookmarkArray));

    }else{
        //set bookmarkArray to the existing data and push new bookmark to it
        bookmarkArray = JSON.parse(localStorage.getItem('bookmarks'));

        bookmarkArray.push(bookmark);
        // Add new value to local storage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarkArray));
    }

    // reset form

    document.getElementById('myForm').reset();

    // refresh bookmarks
    fetchBookmarks();

    e.preventDefault();
}

//delete or remove bookmark by url

function deleteBookmark(url) {
    // get bookmarkArray from local storage;
    var bookmarkArray = JSON.parse(localStorage.getItem('bookmarks'));

    // loop through bookmark array and check if url tobe  deleted equals the one in local storage
    for(var k = 0; k < bookmarkArray.length; k++){
        if(bookmarkArray[k].url === url){
            bookmarkArray.splice(k,1);
        }
    }

    // remove deleted bookmark and update bookmark array in local storage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarkArray));

    //re-fetch bookmarks
    fetchBookmarks();
}

// validate form function

function validateForm(siteName,siteUrl) {
    // check if site url and site name are not empty
    if(!siteUrl || !siteName){
        alert("Please Enter Site Name and Url");
        return false;
    }

    // check if it follows url naming standards with regular expression
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert("Please Use a valid Url");
        return false;
    }

    return true;
}

// fetch bookmarks function and display in view
function fetchBookmarks() {
    // get bookmarkArray from local storage;
    var bookmarkArray = JSON.parse(localStorage.getItem('bookmarks'));

    var bookmarkResults = document.getElementById('bookmarksResult');

    bookmarkResults.innerHTML = '';

    //loop that iterates through the bookmarkArray from local storage
    for( var i = 0; i< bookmarkArray.length; i++){

        var siteName = bookmarkArray[i].name;
        var siteUrl = bookmarkArray[i].url;

        bookmarkResults.innerHTML+= '<div class="well">'+
            '<h3>'+siteName+
            ' <a class="btn btn-default" target="_blank" href="'+siteUrl+'">Visit Site</a> '+
            ' <a onclick="deleteBookmark(\''+siteUrl+'\')" class="btn btn-danger" href="#">Delete Bookmark</a> '+
            '</h3>'+
            '</div>';
    }
}

