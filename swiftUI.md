# SwiftUI

## Links
```swift
Link("Go to Apple", destination: URL(string: "https://apple.com")!)
Link("Go to Action", destination: URL(string: "tel:1231231233")!)
Link("Send an email", destination: URL(string: "mailto:example.com")!)
```

*Custom links*
```swift
Link("Send an email", destination: URL(string: "mailto:example.com")!)
    .buttonStyle(.plain)
    .buttonBorderShape(.roundedRectangle)
    .controlSize(.regular)
    .padding()
    .border(.primary, width: 2)
    .tint(.pink)
```
