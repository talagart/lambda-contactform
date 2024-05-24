# Serverless Contact Form for Static Website

## Overview
This project provides a serverless contact form solution for static websites using AWS services such as Lambda, API Gateway, and Simple Email Service (SES). The goal is to enable static websites to handle contact form submissions without the need for a backend server.

## Table of Contents
1. [Problem](#problem)
2. [Solution](#solution)
3. [Impact](#impact)
4. [Getting Started](#getting-started)
   - [Requirements](#requirements)
   - [Setup](#setup)
5. [Implementation](#implementation)
   - [HTML Contact Form](#html-contact-form)
   - [JavaScript Function](#javascript-function)
   - [Lambda Function](#lambda-function)
6. [Cleanup](#cleanup)
7. [Repository](#repository)
8. [Contributing](#contributing)
9. [License](#license)

## Problem
Traditional static websites hosted on platforms like GitHub Pages lack the capability to handle dynamic features like contact forms. This limitation poses a challenge for website owners who want to engage with their visitors and gather feedback or inquiries.

## Solution
To address this problem, I developed a serverless contact form solution leveraging the power of AWS (Amazon Web Services). By utilizing AWS Lambda, API Gateway, and Simple Email Service (SES), I created a seamless and efficient method for collecting visitor messages without the need for a backend server. This serverless architecture allows the contact form to function effectively within the constraints of a static website, ensuring smooth communication between website owners and their audience.

## Impact
The implementation of the serverless contact form has significantly enhanced the functionality of static websites hosted on GitHub Pages or similar platforms. Website owners can now easily integrate a contact form without the complexities of managing a backend infrastructure. This project showcases my ability to leverage cloud services to solve real-world problems, demonstrating innovation, efficiency, and adaptability in web development.

## Getting Started

### Requirements
- AWS Account
- Basic knowledge of HTML and JavaScript

### Setup

#### Step 1: Create AWS Lambda Function
1. Log in to the [AWS Management Console](https://aws.amazon.com/console/).
2. Navigate to **Lambda**.
3. Click on **Create function**.
4. Choose **Author from scratch**.
5. Enter the function name (e.g., `ContactFormFunction`).
6. Choose the runtime as **Node.js**.
7. Click **Create function**.

#### Step 2: Add Code to Lambda Function
1. In the Lambda function code editor, replace the default code with the following:
    ```javascript
    const AWS = require('aws-sdk');
    const ses = new AWS.SES({ region: 'us-east-1' });

    exports.handler = async (event) => {
      const { name, email, message } = JSON.parse(event.body);

      const params = {
        Destination: {
          ToAddresses: ['YOUR_EMAIL@example.com']
        },
        Message: {
          Body: {
            Text: { Data: `Name: ${name}\nEmail: ${email}\nMessage: ${message}` }
          },
          Subject: { Data: 'New Contact Form Submission' }
        },
        Source: 'YOUR_VERIFIED_EMAIL@example.com'
      };

      try {
        await ses.sendEmail(params).promise();
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Message sent successfully' })
        };
      } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Failed to send message' })
        };
      }
    };
    ```
2. Replace `YOUR_EMAIL@example.com` with your verified email address in SES.
3. Click **Deploy**.

#### Step 3: Create API Gateway
1. Navigate to **API Gateway** in the AWS Management Console.
2. Click on **Create API** and choose **REST API**.
3. Click **Build**.
4. Enter the API name (e.g., `ContactFormAPI`) and click **Create API**.
5. Click on **Actions** and select **Create Resource**.
6. Enter a Resource Name (e.g., `contactform`) and click **Create Resource**.
7. With the new resource selected, click **Actions** and choose **Create Method**.
8. Select **POST** and click the checkmark.
9. In the **Integration type** section, select **Lambda Function**.
10. Check the box for **Use Lambda Proxy integration**.
11. Enter the name of the Lambda function you created earlier.
12. Click **Save** and **OK** to give API Gateway permission to invoke your Lambda function.
13. Click **Deploy API** from the **Actions** drop-down menu.
14. Create a new deployment stage (e.g., `prod`) and click **Deploy**.
15. Note the **Invoke URL** for the deployed API.

#### Step 4: Configure SES
1. Navigate to **Simple Email Service (SES)** in the AWS Management Console.
2. Verify your email address under **Email Addresses**.
3. Use this verified email address in the Lambda function code.

## Implementation

### HTML Contact Form
Include the following HTML code in your static website:
```html
<form id="contact-form">
  <input type="text" id="name" name="name" placeholder="Your Name" required>
  <input type="email" id="email" name="email" placeholder="Your Email" required>
  <textarea id="message" name="message" placeholder="Your Message" required></textarea>
  <button type="submit">Send Message</button>
</form>
<script src="contact-form.js"></script>
```

### JavaScript Function
Include the JavaScript Function in your static website.

```javascript
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  fetch('YOUR_API_GATEWAY_ENDPOINT', {
    method: 'POST',
    body: JSON.stringify({ name, email, message }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => alert('Message sent successfully'))
  .catch(error => console.error('Error:', error));
});

```

Replace YOUR_API_GATEWAY_ENDPOINT with the invoke URL from API Gateway.

#### Cleanup
To avoid any unexpected charges, make sure to delete all the AWS resources created during this project:

Delete the Lambda function
Remove the API Gateway
Remove any SES configurations


#### License
This project is licensed under the MIT License. See the LICENSE file for details.

This README includes all the necessary steps for setting up and deploying the serverless contact form using the AWS Management Console, without assuming any prior use of the AWS CLI. It also follows best practices for a GitHub README, making it easy for users to follow along and implement the solution.

