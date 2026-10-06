# TrueSheet `scrollableRef` incompatibility with LegendList

TrueSheet's [`scrollableRef` API](https://sheet.lodev09.com/guides/scrolling) enables automatic scroll gesture handling for scrollables such as `ScrollView` & `FlatList`. However, it currently doesn't work with LegendList, logging the following error in the console:

```
WARN  TrueSheet: scrollableRef points to an unmounted component. [Error: Argument appears to not be a ReactComponent. Keys: clearCaches,flashScrollIndicators,getAnimatableRef,getNativeScrollRef,getScrollableNode,getScrollResponder,getState,reportContentInset,scrollIndexIntoView,scrollItemIntoView,scrollToEnd,scrollToIndex,scrollToItem,scrollToOffset,setItemSize,setScrollProcessingEnabled,setVisibleContentAnchorOffset]
```

This seems to be caused by the [`findNodeHandle()` method exported by React Native](https://github.com/lodev09/react-native-true-sheet/blob/v4.0.0-beta.23/src/TrueSheet.tsx#L195-L213). I saw that [Gorhom bottom sheet had a similar issue with the method for Web](https://redirect.github.com/gorhom/react-native-bottom-sheet/commit/47a95f517ab5b4680d0f5a45b09464911aafd35e), and came up with a following patch that fixes the issue & gets the scroll handling to work:

```ts
import type React from "react";
import { findNodeHandle as _findNodeHandle } from "react-native";

export function findNodeHandle(
  componentOrHandle:
    | null
    | number
    | React.Component<any, any>
    | React.ComponentClass<any>,
) {
  try {
    return _findNodeHandle(componentOrHandle);
  } catch {
    // @ts-ignore
    const nativeScrollRef = componentOrHandle.getNativeScrollRef?.();
    return nativeScrollRef ? _findNodeHandle(nativeScrollRef) : null;
  }
}
```
