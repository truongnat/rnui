# Dialog

Modal dialog surface.

## Usage

```tsx
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@rnui/ui";

<Dialog open onClose={() => {}}>
  <DialogTitle>Confirm</DialogTitle>
  <DialogContent>Are you sure?</DialogContent>
  <DialogActions>
    <Button>Cancel</Button>
    <Button variant="contained">OK</Button>
  </DialogActions>
</Dialog>
```

## Notes

- Refer to the component props in the API reference or source for advanced configuration.
