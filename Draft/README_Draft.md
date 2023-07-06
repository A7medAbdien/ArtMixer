# Post

Finally I am releasing a project - it is a 3D website, where you could mix two images!

The whole idea was to show that I finished this course,, but somehow it turned into a front-end project and involved many Blender tutorials.

However, I learned a lot, some of those many things:
1. Stick to CLASSIC projects. I really hated the idea of using my GPU that much.
2. While I enjoyed designing the website, I'm grateful to be a programmer and not an interior designer!



## five rooms

1. Uploading images
2. Run CoLab notebook as a backend service
3. Waiting room
4. show result of mixed images
5. credits


# Four walls

1. Uploads, Uploading them
2. Run (CoLab), Green and wooden floor
3. Collection, chair and table, plan blue
4. Waiting Room


# What remains

1. show REsult
2. Upload

# edit frame

```jsx
    const { position, rotation, scale } = useControls('GRoom',
        {
            position:
            {
                value: { x: -0.71, y: 1.1, z: 0.81 },
                step: 0.01,
                joystick: 'invertY'
                // { "position": { "x": -0.7100000000000002, "y": 1.1, "z": 0.8099999999999996 } }
            },
            rotation:
            {
                value: { x: -0.27, y: 0.34, z: 0.09 },
                step: 0.001,
                joystick: 'invertY'
            },
            // { "rotation": { "x": -0.27999999999999997, "y": 0.34000000000000014, "z": 0.08999999999999998 } }            
            scale:
            {

                value: { x: 0.862, y: .856 },
                // value: { x: -349.2, y: -246.0 },
                step: 0.001,
                joystick: 'invertY'
                // { "scale": { "x": 0.8620000000000003, "y": 0.8561999816894527 } }  
            },
        })
```

# v0.3

Notes: DO NOT UPLOAD ANY PERSONAL IMAGES

Please rate the followings: from 1-5
1. Overall esperance
2. Colors
3. Position
4. Motion with moving your mouse



# Welcome

Hi, I am Time. A new type of blender.

I will introduce myself until the image finch loading

I mix Art... 

Ya my developer has really nothing to do 🙄. So...

You can enter an image like this...

let us call it content

And another one like this...

let us call it style

and I will give you something like that.

# Instructions


1. Upload Images
Title: Upload images

Instructions:
- Click the "Choose Files" button to select the images you want to upload.
- You can upload multiple images at once by selecting them all.
- Images must be in JPG, PNG, or GIF format and no larger than 10MB each.
- After selecting your images, click the "Upload" button to start the upload process.
- Once the upload is complete, you'll see a confirmation message.

2. Run Mixer
Title: Run mixer

Instructions:
- Adjust the sliders to set the mix settings for your images.
- You can adjust the brightness, contrast, saturation, and other settings to get the desired effect.
- You can preview the mix in real-time by clicking the "Preview" button.
- When you're happy with the mix, click the "Run Mixer" button to start the process.

3. Wait result
Title: Please wait

Instructions:
- Your images are being processed. This may take several minutes depending on the size of your images and the complexity of the mix.
- Please do not close your browser or navigate away from this page while the processing is in progress.
- You can check the progress of the process by looking at the progress bar.

4. Show result
Title: Preview your mix

Instructions:
- Your mix is ready! You can preview it by clicking the "Preview" button.
- If you're happy with the result, you can download the mix by clicking the "Download" button.
- If you're not satisfied with the result, you can go back and adjust the mix settings and run the mixer again.

5. Title: Credits

Instructions:
- Thank you for using our image mixing tool! We hope you found it useful.
- This tool was created by [Your Name/Company Name] with the support of [any contributors or third-party tools used].
- If you'd like to support our work, please consider sharing this tool with others or making a donation.
- For any inquiries or feedback, please contact us at [your email address or contact form].
- We appreciate your support and hope you enjoy using our tool.


# test

```html
<div class='console-container'><span id='text'></span><div class='console-underscore' id='console'>&#95;</div></div>
```

```css
@import url(https://fonts.googleapis.com/css?family=Khula:700);
body {
  background: #111;
}
.hidden {
  opacity:0;
}
.console-container {
 
  font-family:Khula;
  font-size:4em;
  text-align:center;
  height:200px;
  width:600px;
  display:block;
  position:absolute;
  color:white;
  top:0;
  bottom:0;
  left:0;
  right:0;
  margin:auto;
}
.console-underscore {
   display:inline-block;
  position:relative;
  top:-0.14em;
  left:10px;
}
```

```js
// function([string1, string2],target id,[color1,color2])    
 consoleText(['Hello World.', 'Console Text', 'Made with Love.'], 'text',['tomato','rebeccapurple','lightblue']);

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  var con = document.getElementById('console');
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id)
  target.setAttribute('style', 'color:' + colors[0])
  window.setInterval(function() {

    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function() {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, 120)
  window.setInterval(function() {
    if (visible === true) {
      con.className = 'console-underscore hidden'
      visible = false;

    } else {
      con.className = 'console-underscore'

      visible = true;
    }
  }, 400)
}
```