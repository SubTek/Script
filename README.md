
# Egern Scripts Repository

Welcome to the Egern Scripts repository! This repository contains scripts designed for the **Egern** app, available on the [Apple App Store](https://apps.apple.com/us/app/egern/id1616105820). These scripts are intended for educational purposes, particularly for learning open-source JavaScript techniques.

## About Egern
Egern is a feature-rich app designed for inspecting and debugging network traffic. It provides users with a robust set of tools to capture and analyze DNS and HTTP network traffic. Its intuitive interface and powerful functionalities make it an essential tool for developers, network administrators, and tech enthusiasts. Learn more about the app and its capabilities on the [Egern website](https://egernapp.com/).

## Disclaimer
1. **For Educational Use Only**: The scripts in this repository are intended solely for learning and exploring open-source JavaScript. They are not meant for illegal purposes or commercial use.
2. **No Guarantees**: The author makes no guarantees about the functionality, accuracy, or reliability of these scripts. Use them at your own discretion.
3. **Responsibility**:
   - The author is not responsible for any misuse of these scripts.
   - By using or copying any script in this repository, you agree to take full responsibility for your actions.
4. **Ownership and Intellectual Property**:
   - If any organization or individual believes that a script in this repository infringes upon their rights, please notify us with proof of identity and ownership. We will remove the script after verifying the claim.
5. **Content Deletion**: All content in this repository must be deleted within 24 hours of downloading.
6. **Agreement**: Viewing, copying, or using any script in this repository constitutes acceptance of this disclaimer. Please read it carefully.

## Important Notes
- **Prohibited Uses**: Do not use any scripts for illegal activities. Misuse is strictly prohibited and will be considered at your own risk.
- **Updates to Disclaimer**: The author reserves the right to modify or supplement this disclaimer at any time.

## Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/egern-scripts.git
   ```
2. Explore the scripts and learn how they work.
3. Follow the instructions provided in each script's documentation for further guidance.

## How to Use Egern Scripts
Using the Egern app and scripts effectively involves the following steps:

### Step 1: Install VPN Configuration in Egern
1. Open the Egern app.
2. Click **Start** on the top-right corner and allow VPN configuration when prompted.
3. Enter your device passcode and wait for the VPN connection to be established.
4. Once successfully connected, you will see **Stop** on the top-right corner. Click it if needed to disconnect.

### Step 2: Download the Configuration File
1. Open the Egern app and navigate to the **Tools** tab.
2. Click the three dots on the top-right corner and select **Download Configuration**.
3. Enter the following URL: `egern.yaml`.
4. Disable the **Merge** option and click **Download**.
5. Confirm the **Configuration Overwrite** popup by clicking **Confirm**.
6. Scroll down to the bottom of the **Tools** tab and open the **Scripts** section under Scripting. If the configuration file was successfully downloaded, you will see the **AppTesters Configuration** listed there.

### Step 3: Install a Profile and Trust the Certificate
1. Go to the **Tools** tab in Egern.
2. Scroll to the **MITM** section and select **Certificate**.
3. Click **Generate New Certificate**.
4. Click **Install Certificate**, which will switch you to Safari to download a profile.
5. Allow the download and navigate to **Settings > General > VPN & Device Management**.
6. Select the downloaded profile labeled **Egern CA DATE** and click **Install**.
7. Navigate to **Settings > General > About > Certificate Trust Settings** and enable the **Egern CA Certificate**.

Following these steps ensures the Egern app and scripts function correctly for debugging and analyzing network traffic.

## Contributing
Contributions are welcome! Please ensure your submissions align with the purpose and rules of this repository. Create a pull request or open an issue for suggestions and improvements.

## License
This repository is distributed under the [MIT License](LICENSE). By using this repository, you agree to comply with the terms of this license.

---

**Note**: Always ensure your use of these scripts complies with applicable laws and respects intellectual property rights. Thank you for supporting ethical and responsible coding practices!
