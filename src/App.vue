<template>
  <a-layout id="app">
    <a-layout-header>
      <a-menu
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="search">
          <router-link to="/">Search</router-link>
         
        </a-menu-item>
        <a-menu-item key="analysis">
          <router-link to="/upload">Analysis</router-link>
          
        </a-menu-item>
        <a-menu-item key="detail">
          <router-link to="/Detail">Detail</router-link>
          
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px;">
    <router-view/>
    </a-layout-content>
  </a-layout>
  </div>
</template>

