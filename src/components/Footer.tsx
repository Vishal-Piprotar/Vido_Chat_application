import { EuiCode, EuiPanel, EuiText } from "@elastic/eui";
import React from "react";
import './Footer.css'

function Footer() {
  return (
    <>
      <div >
        <EuiPanel>
          <EuiText style={{ bottom: "0px", fontWeight:'bold'}} textAlign="center">Created By Vishal Piprotar | &copy; Copyright 2024</EuiText>
        </EuiPanel>
      </div>
    </>
  );
}

export default Footer;
