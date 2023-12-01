import React, { Component } from 'react';
import App from './App';
import About from './pages/About';
import Contact from './pages/Contact';
import NavigationBar from './NavigationBar';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NoMatch from './pages/NoMatch';
import Reddit from './Reddit';
import Joke from './Joke';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function Root() {
  const routes = [
    { path: '/', name: 'Home', Component: App, exact: true },
    { path: '/about', name: 'About', Component: About, exact: false },
    { path: '/contact', name: 'Contact', Component: Contact, exact: false },
    { path: '/blog', name: 'Blog', Component: Blog, exact: true },
    { path: '/blog/:id', name: 'BlogPost', Component: BlogPost, exact: false },
    { path: '/reddit', name: 'Reddit', Component: Reddit, exact: false },
    { path: '/joke', name: 'Joke', Component: Joke, exact: false },
    { path: '*', name: 'NoMatch', Component: NoMatch, exact: false },
  ];

  return (
    <BrowserRouter>
      <div className="todo-app-container">
        <NavigationBar />
        <div className="content">
          <Routes>
            {routes.map(({ path, Component, exact }) => (
              <Route exact={exact} path={path} element={<Component />} />
            ))}

            {/* <Route exact path="/" element={<App />} /> */}
            {/* <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="*" element={<NoMatch />} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
