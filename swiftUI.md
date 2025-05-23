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
*Extension*
```swift
import SwiftUI

extension Image {
    func imageModifier() -> some View {
        self
            .resizable()
            .scaledToFit()
    }
    
    func iconModifier() -> some View {
        self
            .imageModifier()
            .frame(maxWidth: 128)
            .foregroundColor(.purple)
            .opacity(0.5)
    }
}

struct ContentView: View {
    private let imageURL: String = "https://credo.academy/credo-academy@3x.png"
    
    var body: some View {
        // AsyncImage(url: URL(string: imageURL))
        
        // MARK: - 2 . SCALE
        // Default value is 1.0. The greater the value the smaller the image
        // AsyncImage(url: URL(string: imageURL), scale: 3.0)
        
        // MARK - 3. PLACEHOLDER
        AsyncImage(url: URL(string: imageURL)) {
              image in image.imageModifier()
          } placeholder: {
              Image(systemName: "photo.circle.fill").iconModifier()
          }
          .padding(40)

    }
}
```

*Phase*
If the image failed to load then a placeholder image will be used in place <br/>
```swift
struct ContentView: View {
    private let imageURL: String = "https://credo.academy/credo-academy@3x.png"
    
    var body: some View {
        AsyncImage(url: URL(string: imageURL)) { phase in
            // Async phases
            // SUCCESS: image successfully loaded
            // FAILURE:
            // EMPTY
            if let image = phase.image {
                image.imageModifier()
            } else if phase.error != nil {
                Image(systemName: "ant.circle.fill").iconModifier()
            } else {
                Image(systemName: "photo.circle.fill").iconModifier()
            }
        }
        .padding(40)
    }
}
```

*Animation*
```swift
AsyncImage(url: URL(string: imageURL), transaction: Transaction(animation: .spring(response: 0.5, dampingFraction: 0.6, blendDuration: 0.25))) { phase in
    switch phase {
    case .success(let image):
        image
            .imageModifier()
            // .transition(.move(edge: .bottom)) // move the image from bottom
            // .transition(.slide)
            .transition(.scale)
    case .failure(_):
        Image(systemName: "ant.circle.fill").iconModifier()
    case .empty:
        Image(systemName: "photo.circle.fill").iconModifier()
    @unknown default:
        ProgressView()
    }
}
.padding(40)
```

*Full Code* <br/>

```swift
//
//  ContentView.swift
//  HelloWorld
//
//  Created by Khoa Le on 4/27/25.
//

import SwiftUI

extension Image {
    func imageModifier() -> some View {
        self
            .resizable()
            .scaledToFit()
    }
    
    func iconModifier() -> some View {
        self
            .imageModifier()
            .frame(maxWidth: 128)
            .foregroundColor(.purple)
            .opacity(0.5)
    }
}

struct ContentView: View {
    private let imageURL: String = "https://credo.academy/credo-academy@3x.png"
    
    var body: some View {
        VStack {
            Image(systemName: "globe")
                .imageScale(.large)
                .foregroundStyle(.tint)
            Text("Hello, world!")
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
            
            AsyncImage(url: URL(string: imageURL), transaction: Transaction(animation: .spring(response: 0.5, dampingFraction: 0.6, blendDuration: 0.25))) { phase in
                switch phase {
                case .success(let image):
                    image
                        .imageModifier()
                        //.transition(.move(edge: .bottom)) // move the image from bottom
                        .transition(.scale)
                case .failure(_):
                    Image(systemName: "ant.circle.fill").iconModifier()
                case .empty:
                    Image(systemName: "photo.circle.fill").iconModifier()
                @unknown default:
                    ProgressView()
                }
            }
            .padding(40)
        }
    }
}

struct ContentView_previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
```

![Image Animation](./images/image-animation.gif)







