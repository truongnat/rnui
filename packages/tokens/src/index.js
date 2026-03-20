"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.focusRingAnimation = exports.timingPreset = exports.motionPreset = exports.pressFeedback = exports.easing = exports.duration = exports.spring = exports.timelineTokens = exports.paginationTokens = exports.ratingTokens = exports.selectTokens = exports.tabsTokens = exports.dialogTokens = exports.fabTokens = exports.chipTokens = exports.sliderTokens = exports.radioTokens = exports.switchTokens = exports.checkboxTokens = exports.avatarTokens = exports.toastTokens = exports.badgeTokens = exports.cardTokens = exports.inputTokens = exports.buttonTokens = exports.resolveComponentTokens = exports.buildSemanticTokens = exports.semanticTokens = exports.darkTokens = exports.lightTokens = exports.getBrandColors = exports.defineBrand = exports.primitive = void 0;
// Primitive tokens — raw values
var primitive_1 = require("./primitive");
Object.defineProperty(exports, "primitive", { enumerable: true, get: function () { return primitive_1.primitive; } });
// Brand system — defineBrand, BrandColorGroup, getBrandColors
var brand_1 = require("./brand");
Object.defineProperty(exports, "defineBrand", { enumerable: true, get: function () { return brand_1.defineBrand; } });
Object.defineProperty(exports, "getBrandColors", { enumerable: true, get: function () { return brand_1.getBrandColors; } });
// Semantic tokens — light + dark + brand-aware factory
var semantic_1 = require("./semantic");
Object.defineProperty(exports, "lightTokens", { enumerable: true, get: function () { return semantic_1.lightTokens; } });
Object.defineProperty(exports, "darkTokens", { enumerable: true, get: function () { return semantic_1.darkTokens; } });
Object.defineProperty(exports, "semanticTokens", { enumerable: true, get: function () { return semantic_1.semanticTokens; } });
Object.defineProperty(exports, "buildSemanticTokens", { enumerable: true, get: function () { return semantic_1.buildSemanticTokens; } });
// Component tokens — per-component recipes
var component_1 = require("./component");
Object.defineProperty(exports, "resolveComponentTokens", { enumerable: true, get: function () { return component_1.resolveComponentTokens; } });
Object.defineProperty(exports, "buttonTokens", { enumerable: true, get: function () { return component_1.buttonTokens; } });
Object.defineProperty(exports, "inputTokens", { enumerable: true, get: function () { return component_1.inputTokens; } });
Object.defineProperty(exports, "cardTokens", { enumerable: true, get: function () { return component_1.cardTokens; } });
Object.defineProperty(exports, "badgeTokens", { enumerable: true, get: function () { return component_1.badgeTokens; } });
Object.defineProperty(exports, "toastTokens", { enumerable: true, get: function () { return component_1.toastTokens; } });
Object.defineProperty(exports, "avatarTokens", { enumerable: true, get: function () { return component_1.avatarTokens; } });
Object.defineProperty(exports, "checkboxTokens", { enumerable: true, get: function () { return component_1.checkboxTokens; } });
Object.defineProperty(exports, "switchTokens", { enumerable: true, get: function () { return component_1.switchTokens; } });
Object.defineProperty(exports, "radioTokens", { enumerable: true, get: function () { return component_1.radioTokens; } });
Object.defineProperty(exports, "sliderTokens", { enumerable: true, get: function () { return component_1.sliderTokens; } });
Object.defineProperty(exports, "chipTokens", { enumerable: true, get: function () { return component_1.chipTokens; } });
Object.defineProperty(exports, "fabTokens", { enumerable: true, get: function () { return component_1.fabTokens; } });
Object.defineProperty(exports, "dialogTokens", { enumerable: true, get: function () { return component_1.dialogTokens; } });
Object.defineProperty(exports, "tabsTokens", { enumerable: true, get: function () { return component_1.tabsTokens; } });
Object.defineProperty(exports, "selectTokens", { enumerable: true, get: function () { return component_1.selectTokens; } });
Object.defineProperty(exports, "ratingTokens", { enumerable: true, get: function () { return component_1.ratingTokens; } });
Object.defineProperty(exports, "paginationTokens", { enumerable: true, get: function () { return component_1.paginationTokens; } });
Object.defineProperty(exports, "timelineTokens", { enumerable: true, get: function () { return component_1.timelineTokens; } });
// Motion tokens — animation presets
var motion_1 = require("./motion");
Object.defineProperty(exports, "spring", { enumerable: true, get: function () { return motion_1.spring; } });
Object.defineProperty(exports, "duration", { enumerable: true, get: function () { return motion_1.duration; } });
Object.defineProperty(exports, "easing", { enumerable: true, get: function () { return motion_1.easing; } });
Object.defineProperty(exports, "pressFeedback", { enumerable: true, get: function () { return motion_1.pressFeedback; } });
Object.defineProperty(exports, "motionPreset", { enumerable: true, get: function () { return motion_1.motionPreset; } });
Object.defineProperty(exports, "timingPreset", { enumerable: true, get: function () { return motion_1.timingPreset; } });
Object.defineProperty(exports, "focusRingAnimation", { enumerable: true, get: function () { return motion_1.focusRingAnimation; } });
//# sourceMappingURL=index.js.map