const progress = require("progress");
const inquirer = require("inquirer");
const config = require("./config");
const ding = require("./ding");

const createBar = (text, time) => {
  return new progress(`${text}: [:bar] :current`, {
    total: time,
    complete: config.progress.complete,
    incomplete: config.progress.incomplete,
    width: config.progress.width
  });
};

const work = () => {
  const bar = createBar("Work", config.timers.work);
  const done = () => {
    ding();
    inquirer.prompt([config.questions.work]).then(answers => {
      switch (answers.next) {
        case "short":
          rest(config.timers.short);
          break;
        case "long":
          rest(config.timers.long);
          break;
        case "quit":
        default:
          return;
          break;
      }
    });
  };

  const timer = setInterval(() => {
    bar.tick();
    if (bar.complete) {
      clearInterval(timer);
      done();
    }
  }, 1000);
};

const rest = time => {
  const bar = createBar("Rest", time);
  const done = () => {
    ding();
    inquirer.prompt([config.questions.rest]).then(answers => {
      switch (answers.next) {
        case "work":
          work();
          break;
        case "quit":
        default:
          return;
          break;
      }
    });
  };

  const timer = setInterval(() => {
    bar.tick();
    if (bar.complete) {
      clearInterval(timer);
      done();
    }
  }, 1000);
};

work();
