<!-- Side Bar example -->
<template>
  <nav class="sidebar">
    <header>
      <div class="image-text">
        <span class="image">
          <img src="images/auscycling-logo.png" alt="logo" />
        </span>

        <div class="text header-text">
          <span class="name"> CYCOUT10</span>
        </div>
      </div>
    </header>

    <div class="menu-bar">
      <div class="menu">
        <li class="search-box">
          <i class="bx bx-search-alt icon"></i>
          <input
            class="search-box-input"
            type="Search"
            placeholder="Search..."
          />
        </li>

        <li class="nav-link">
          <a href="#">
            <i class="bx bx-home-alt icon"></i>
            <span class="text nav-text"> Dashboard</span>
          </a>
        </li>

        <li class="nav-link">
          <a href="#">
            <i class="bx bx-cycling icon"></i>
            <span class="text nav-text"> My Bikes</span>
          </a>
        </li>

        <li class="nav-link">
          <a href="#">
            <i class="bx bx-map icon"></i>
            <span class="text nav-text"> My Courses</span>
          </a>
        </li>

        <li class="nav-link">
          <a href="#">
            <i class="bx bxs-flag-checkered icon"></i>
            <span class="text nav-text"> My Races</span>
          </a>
        </li>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "SideBar",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dash_button {
  background-color: #f3eb0c;
  color: #10514a;
  border: none;
  height: 40px;
  width: 100px;
  border-radius: 12px;
  cursor: pointer;
}

body {
  height: 100vh;
  background-color: var(--body-color) !important;
}

.sidebar .text {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color);
}

.sidebar .image {
  display: flex;
  align-items: center;
}

/* */
.sidebar .image-text img {
  width: 120px;
  border-radius: 6px;
  top: 0;
  left: 0;
}

.sidebar {
  position: fixed;
  height: 100%;
  width: 250px;
  top: 0;
  left: 0;
  padding: 12px 14px;
  background: var(--sidebar-color);
}

.sidebar header {
  position: relative;
}

.sidebar header .image-text {
  display: flex;
  align-items: center;
}

.sidebar li {
  background: var(--primary-color-light);
  height: 50px;
  margin-top: 10px;
  list-style: none;
  display: flex;
  align-items: center;
  border-radius: 8px;
}

.sidebar li .icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  min-width: 60px;
  color: #10514a;
}

.sidebar li .nav-link {
  position: absolute;
}

.sidebar li .text {
  color: var(--text-color);
  transition: var(--tran-02);
}

.sidebar .search-box {
  background: var(--primary-color-light);
  position: relative;
  border-radius: 8px;
  width: 207px;
}

.search-box input {
  height: 100%;
  width: 90%;
  outline: none;
  border: none;
  border-radius: 8px;
  background: var(--primary-color-light);
}

.search-box .icon {
  position: relative;
  left: 17px;
}

.search-box .search-box-input {
  position: relative;
  left: 15px;
  font-size: large;
}

.sidebar li a {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  text-decoration: none;
  border-radius: 8px;
  transition: var(--tran-04);
}

.sidebar .nav-link:hover {
  background: var(--primary-color);
}

.sidebar li a:hover .icon header .image-text .header-text {
  display: flex;
  flex-direction: column;
}

.header-text .name {
  font-weight: 600;
}

.header-text .profession {
  margin-top: -2px;
}

.sidebar .nav-link {
  position: relative;
}
</style>
