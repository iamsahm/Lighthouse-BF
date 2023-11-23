# Promosite Metrics

This tool is designed to run Lighthouse reports on a list of URLs contained in `urls.json`. The purpose of this tool is to identify areas for improvement in terms of usability and accessibility for our current promosite. The results from this tool serve as a marker for these improvements and guide future developments.

## Usage

1. Make sure you have the latest version of Node.js installed on your machine.

2. Clone this repository and navigate to the project directory.

3. Install the required dependencies by running the following command:

    ```shell
    npm install
    ```

4. Update the `urls.json` file with the list of URLs you want to run the Lighthouse reports on.

The json should be formatted as follows:

```json
[
    "https://www.example.com",
    "https://www.example.com/page1",
    "https://www.example.com/page2"
]
```

5. Run the tool by executing the following command:

    ```shell
    npm run metrics
    ```

    This will format the Lighthouse report for each URL in `urls.json` and return the data as an HTML file. Additionally, it will dump all the results in order in `results.json` inside the folder with the current timestamp.

6. Review the generated HTML report and `results.json` to identify areas for improvement in your promosite.

## License

This project is licensed under the [MIT License](LICENSE).
