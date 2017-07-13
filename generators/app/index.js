"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const prompts = require("./prompts");
const utils = require("./utils");
const moment = require("moment");
const _ = require("underscore");
const senseLoc = require("sense-loc");

module.exports = class extends Generator {
  initializing() {
    var done = this.async();
    this.props = {};
    var _this = this;

    senseLoc.getLocalExtensionPath(function(err, data) {
      _this.props.localExtensionDir = data;
      done(err);
    });
  }
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        "Welcome to the fantabulous " +
          chalk.red("generator-qsextension-webpack") +
          " generator!"
      )
    );

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = _.extend(this.props, props);

      this.props.extensionNameSafe = props.extensionName.replace(/\s/g, "");
      this.props.extensionNamespace = _.isEmpty(props.extensionNamespace)
        ? ""
        : props.extensionNamespace + "-";

      var d = new Date();
      this.props.publishingYear = d.getFullYear();
      this.props.creationDate = moment(d).format("YYYY-MM-DD");
      this.props.licenceGenerated = utils.getLicense(this.props);
    });
  }

  writing() {
    this._root();
    this._src();
    this._partials();
  }

  _root() {
    this.fs.copyTpl(
      this.templatePath("webpack/package.json"),
      this.destinationPath("package.json"),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath("webpack/webpack.config.js"),
      this.destinationPath("webpack.config.js"),
      this.props
    );
    this.fs.copy(
      this.templatePath("webpack/.babelrc"),
      this.destinationPath(".babelrc")
    );
    this.fs.copyTpl(
      this.templatePath("webpack/copy-to-local-qik-sense.js"),
      this.destinationPath("copy-to-local-qik-sense.js"),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath("readme.md"),
      this.destinationPath("readme.md"),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath("license.md"),
      this.destinationPath("license.md"),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath("changelog.yml"),
      this.destinationPath("changelog.yml"),
      this.props
    );
  }

  _src() {
    //this.fs.mkdir( 'src' );
    this.fs.copyTpl(
      this.templatePath("src/index.js"),
      this.destinationPath("src/index.js"),
      this.props
    );
    this.fs.copy(
      this.templatePath("src/initialproperties.js"),
      this.destinationPath("src/initialproperties.js")
    );
    this.fs.copy(
      this.templatePath("src/properties.js"),
      this.destinationPath("src/properties.js")
    );
    this.fs.copy(
      this.templatePath("src/paint.js"),
      this.destinationPath("src/paint.js")
    );
    this.fs.copy(
      this.templatePath("src/controller.js"),
      this.destinationPath("src/controller.js")
    );
    this.fs.copyTpl(
      this.templatePath("src/extension.qext"),
      this.destinationPath(
        "src/" +
          this.props.extensionNamespace.toLowerCase() +
          this.props.extensionNameSafe.toLowerCase() +
          ".qext"
      ),
      this.props
    );
    this.fs.copy(
      this.templatePath("src/extension.png"),
      this.destinationPath(
        "src/" +
          this.props.extensionNamespace.toLowerCase() +
          this.props.extensionNameSafe.toLowerCase() +
          ".png"
      )
    );
  }

  _partials() {
    //this.fs.mkdir( 'partials' );
    this.fs.copy(
      this.templatePath("src/lib/partials/ng-extension.html"),
      this.destinationPath(
        "src/lib/partials/ng-" +
          this.props.extensionNameSafe.toLowerCase() +
          ".html"
      )
    );
  }

  install() {
    this.installDependencies();
  }
};
