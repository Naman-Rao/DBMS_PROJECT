import React from 'react';
import './Breadcrumb.css';

const Breadcrumb = () => {
  return (
    <nav className="breadcrumb">
      <a href="/">Home</a> &gt; <a href="/cloud">Cloud Management</a> &gt; <span>What is ERP?</span>
    </nav>
  );
};

export default Breadcrumb;
