const React = require('react');

const Svg = React.forwardRef(({ children, ...props }, ref) =>
  React.createElement('View', { ref, ...props }, children)
);
Svg.displayName = 'Svg';

const Circle = React.forwardRef((props, ref) =>
  React.createElement('View', { ref, ...props })
);
Circle.displayName = 'Circle';

const Path = React.forwardRef((props, ref) =>
  React.createElement('View', { ref, ...props })
);
Path.displayName = 'Path';

const Rect = React.forwardRef((props, ref) =>
  React.createElement('View', { ref, ...props })
);
Rect.displayName = 'Rect';

const Ellipse = React.forwardRef((props, ref) =>
  React.createElement('View', { ref, ...props })
);
Ellipse.displayName = 'Ellipse';

const Line = React.forwardRef((props, ref) =>
  React.createElement('View', { ref, ...props })
);
Line.displayName = 'Line';

const Polygon = React.forwardRef((props, ref) =>
  React.createElement('View', { ref, ...props })
);
Polygon.displayName = 'Polygon';

const Polyline = React.forwardRef((props, ref) =>
  React.createElement('View', { ref, ...props })
);
Polyline.displayName = 'Polyline';

const G = React.forwardRef(({ children, ...props }, ref) =>
  React.createElement('View', { ref, ...props }, children)
);
G.displayName = 'G';

const Defs = React.forwardRef(({ children, ...props }, ref) =>
  React.createElement('View', { ref, ...props }, children)
);
Defs.displayName = 'Defs';

const LinearGradient = React.forwardRef((props, ref) =>
  React.createElement('View', { ref, ...props })
);
LinearGradient.displayName = 'LinearGradient';

const Stop = React.forwardRef((props, ref) =>
  React.createElement('View', { ref, ...props })
);
Stop.displayName = 'Stop';

module.exports = {
  __esModule: true,
  default: Svg,
  Svg,
  Circle,
  Path,
  Rect,
  Ellipse,
  Line,
  Polygon,
  Polyline,
  G,
  Defs,
  LinearGradient,
  Stop,
};
