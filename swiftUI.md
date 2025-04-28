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

*Link View*
```swift
Link(destination: URL(string: "...")!) {
    HStack(spacing: 16) {
        Image(systemName: "apple.logo")
        Text("Apple Store")
    }
    .font(.largeTitle)
    .foregroundColor(.white)
    .padding()
    .padding(.horizontal)
    .background(
        Capsule()
            .fill(Color.blue)
    )
}
```

## Text
*Gradient*
```swift
Text("iOS")
    .font(.system(size: 180))
    .fontWeight(.black)
    .foregroundStyle(
        LinearGradient(
            colors: [.pink, .purple, .blue],
            startPoint: .topLeading,
            endPoint: .bottomTrailing
        )
    )
```

## Load image from internet
Scale Parameter

```swift
import SwiftUI

struct ContentView: View {
    private let imageURL: String = "https://credo.academy/credo-academy@3x.png"
    
    var body: some View {
        // AsyncImage(url: URL(string: imageURL))
        
        // MARK: - 2 . SCALE
        // Default value is 1.0. The greater the value the smaller the image
        // AsyncImage(url: URL(string: imageURL), scale: 3.0)
        
        // MARK - 3. PLACEHOLDER
        AsyncImage(url: URL(string: imageURL)) {
              image in image
          .resizable()
          .scaledToFit()
          } placeholder: {
              Image(systemName: "photo.circle.fill")
                  .resizable()
                  .scaledToFit()
                  .frame(maxWidth: 128)
                  .foregroundColor(.purple)
                  .opacity(0.5)
          }
          .padding(40)

    }
}
```
