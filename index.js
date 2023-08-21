//CareerBeacon Job Post Scraper
const {Builder, By} = require('selenium-webdriver');

const search = async () => {
    //Chrome driver
    let driver = await new Builder().forBrowser("chrome").build();
    try {
        //Search url
        await driver.get("https://www.careerbeacon.com/en/search/Software-jobs-in-St.-John%27s_Newfoundland-And-Labrador?page=2");
        const divs = await driver.findElements(By.className('cb_search_result_left_section'));
        const jobList = []; 

        //for each card element
        for (let i = 0; i < divs.length; i++) {
            const titles = await driver.findElements(By.css('a > strong'));
            const companies = await driver.findElements(By.className('name'));
            const logos = await driver.findElements(By.className('logo'));
            const locations = await driver.findElements(By.className('location mid-grey'));
            const time_posted = await driver.findElements(By.className('job_pub_date'));
            const job_url = await driver.findElements(By.className("non_featured_job_inner_container"))
            const company_job_url = await driver.findElements(By.className("company_job_link"));

            //Create object from derived div properties.
            for (let j = 0; j < titles.length; j++) {
                const job_title = await titles[j].getText();
                const job_company = await companies[j].getText();
                const job_image_url = await logos[j].getAttribute("src");
                const job_location = await locations[j].getText();
                //Todo- Sort by date
                const job_post_date_string = await time_posted[j].getAttribute("title");
                const job_post_date = await new Date(job_post_date_string)
                const job_post_url = await job_url[j].getAttribute('data-posting_url');
                const job_direct_url = await company_job_url[j].getAttribute("data-company_job_link")
                //Job object
                const job = {
                    job_title,
                    job_company,
                    job_location,
                    job_post_date,
                    job_post_date_string,
                    job_image_url,
                    job_post_url,
                    job_direct_url
                };
                jobList.push(job);
            }
        }
        jobList.sort(function(a, b) {
            let c = new Date(a.date);
            let d = new Date(b.date);
            return c-d;
        });
        console.log(jobList);

        try {
            await driver.get()
        } catch (err){

        }
    } finally {
        await driver.quit();
    }
}
search();
