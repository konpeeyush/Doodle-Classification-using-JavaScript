function trainEpoch(training) {
    for (let i = 0; i < training.length; i++) {
        let data = training[i];
        let inputs = Array.from(data).map(x => x / 255);
        let label = training[i].label;

        // console.log(inputs);
        // console.log(label);

        let targets = [0, 0, 0];
        targets[label] = 1;

        // console.log(targets);

        nn.train(inputs, targets);
    }
}

function testAll(testing) {
    let correct = 0;
    for (let i = 0; i < testing.length; i++) {
        let data = testing[i];
        let inputs = Array.from(data).map(x => x / 255);
        let label = testing[i].label;
        let guess = nn.predict(inputs);

        let m = max(guess);
        let classification = guess.indexOf(m);

        if (classification === label) {
            correct++;
        }
    }
    let percent = 100 * correct / testing.length;
    return percent;
}

//Training the NN with epoch
//EXPERIMENTAL!
// for (let i = 1; i < 6; i++) {
//     trainEpoch(training);
//     console.log("Epoch: " + i);
//     console.log("Testing result:");
//     let percent = testAll(testing);
//     console.log("% Correct: " + percent * 100 + " %");
// }