console.log("Hello Princess!");

if (window.innerWidth < 991) {
  profileDropDown.innerHTML =
    "<li><a class='dropdown-item' href='#'>Watch List</a></li><li><a class='dropdown-item' href='#'>Cart</a></li><li><a class='dropdown-item' href='#'>Profile</a></li><li><hr class='dropdown-divider'></li><li><a class='dropdown-item text-danger' href='#'>Sign out</a></li>";
  DesktopOnlyElements("remove");
}
if (window.innerWidth > 991) {
  MobileOnlyElements("remove");
}

function MobileOnlyElements(action) {
  let mobileOnly = document.getElementsByClassName("mobile-only");

  if (action == "remove") {
    for (let i = 0; i < mobileOnly.length; i++) {
      mobileOnly[i].classList.add("d-none");
    }
  } else if (action == "add") {
    for (let i = 0; i < mobileOnly.length; i++) {
      mobileOnly[i].classList.remove("d-none");
    }
  }
}

function DesktopOnlyElements(action) {
  let desktopOnly = document.getElementsByClassName("desktop-only");

  if (action == "remove") {
    for (let i = 0; i < desktopOnly.length; i++) {
      desktopOnly[i].classList.add("d-none");
    }
  } else if (action == "add") {
    for (let i = 0; i < desktopOnly.length; i++) {
      desktopOnly[i].classList.remove("d-none");
    }
  }
}

window.addEventListener("resize", function () {
  let profileDropDown = document.getElementById("profileDropDown");

  if (window.innerWidth <= 991) {
    profileDropDown.innerHTML =
      "<li><a class='dropdown-item' href='#'>Watch List</a></li><li><a class='dropdown-item' href='#'>Cart</a></li><li><a class='dropdown-item' href='#'>Profile</a></li><li><hr class='dropdown-divider'></li><li><a class='dropdown-item text-danger' href='#'>Sign out</a></li>";
    DesktopOnlyElements("remove");
    MobileOnlyElements("add");
  } else {
    profileDropDown.innerHTML =
      "<li><a class='dropdown-item' href='#'>Profile</a></li><li><hr class='dropdown-divider'></li><li><a class='dropdown-item text-danger' href='#'>Sign out</a></li>";
    DesktopOnlyElements("add");
    MobileOnlyElements("remove");
  }
});
