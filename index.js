(function () {
    var preTag = document.getElementById('donut');

    // Angles and Constants
    var A = 1;
    var B = 1;
    var K1 = 150;
    var K2 = 5;
    var t = 2; // Time variable to create smooth transitions

    // Function to render ASCII frame
    function renderAsciiFrame() {
        var b = []; // Array to store ASCII characters
        var z = []; // Array to store depth values

        var width = 280; // Width of frame
        var height = 160; // Height of frame

        A += 0.07; // Increment angle A
        B += 0.03; // Increment angle B
        t += 0.05; // Increment time for smooth transitions

        var cA = Math.cos(A),
            sA = Math.sin(A),
            cB = Math.cos(B),
            sB = Math.sin(B);

        for (var k = 0; k < width * height; k++) {
            b[k] = k % width == width - 1 ? '\n' : ' ';
            z[k] = 0;
        }

        // Generate the torus with dynamic deformations
        for (var j = 0; j < 6.28; j += 0.07) {
            var ct = Math.cos(j);
            var st = Math.sin(j);

            // Inner radius (R1) changes smoothly over time
            var R1 = 1 + 0.3 * Math.sin(2 * t + j); // Dynamic change in cross-section

            // Outer radius (R2) changes smoothly over time
            var R2 = 2 + 0.5 * Math.sin(3 * t + 2 * j); // Dynamic wave in outer radius

            for (var i = 0; i < 6.28; i += 0.02) {
                var sp = Math.sin(i);
                var cp = Math.cos(i);

                // h (height) remains affected by dynamically changing R1 and R2
                var h = ct * R1 + R2;
                var D = 1 / (sp * h * sA + st * cA + 5);
                var tProj = sp * h * cA - st * sA;

                // Project the coordinates into 2D space
                var x = Math.floor(width / 2 + (width / 4) * D * (cp * R2 * cB - tProj * sB)); // R2 affects x-coordinate
                var y = Math.floor(height / 2 + (height / 4) * D * (cp * R2 * sB + tProj * cB)); // R2 affects y-coordinate

                // Calculate index in array
                var o = x + width * y;
                var N = Math.floor(42 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));

                if (y < height && y >= 0 && x >= 0 && x < width && D > z[o]) {
                    z[o] = D;
                    b[o] = '·˜;²”¦!•(*†>=jo%z¢nó±V£ùa5fy6TSûhÇPáÒÿÞýdÜÚøGm€AÕqêgŽRHÀEÁ#æ'[N > 0 ? N : 0];
                }
            }
        }

        // Update the content of the pre element with the generated ASCII art
        preTag.innerHTML = b.join('');
    }

    // Function to start the animation
    function startAsciiAnimation() {
        window.asciiIntervalId = setInterval(renderAsciiFrame, 70);
    }

    renderAsciiFrame(); // Render the initial frame

    if (document.all) {
        window.attachEvent('onload', startAsciiAnimation);
    } else {
        window.addEventListener('load', startAsciiAnimation, false);
    }

    window.addEventListener('resize', renderAsciiFrame);
})();
