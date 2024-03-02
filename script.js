var selectbtn = document.querySelector('[data-testid="comments_container_non_empty_state"] > :nth-child(2) > :nth-child(2)');
var comments = document.querySelector('.wbloks_1.wbloks_90.wbloks_88');


async function main() {
    selectbtn.click();
    filter();
}

async function filter() {
    await wait(2000);
    var checkboxes = await populate();
    for (let i = 0, d = 0; i < checkboxes.length; i++) {
        let comment = checkboxes[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        let username = comment.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[1].children[0].children[0].children[0].innerHTML;
        if (username == "Instagram user ") {
            comment.remove();
            d++;
        }
        if (i == checkboxes.length -1) {
            if (d == 0) {
                if (checkboxes.length < 50) {
                    scroll();
                }
                else {
                    selectcomments(checkboxes);
                }
            }
            else {
                filter();
            }
        }
    }
}

function populate() {
    return new Promise(resolve => {
        var interval = setInterval(() => {
            var checkboxes = document.querySelectorAll('[data-testid="bulk_action_checkbox"]');
            if (checkboxes.length > 0) {
                clearInterval(interval);
                resolve(checkboxes);
            }
        }, 20); 
    });
}

function wait(time) {
    return new Promise(resolve => setTimeout(resolve, time))
}

async function scroll() {
    let height = comments.scrollHeight
    while (true) {
        if (comments.scrollTop >= height) {
            comments.scrollTop = 0;
            break;
        }
        comments.scrollTop += height*0.04;
        await wait(10)
    }
    filter()
}

async function selectcomments(checkboxes) {
    await wait(100);
    for (let i = 0; i < 50; i++) {
        checkboxes[i].children[0].children[0].click();
        let comment = checkboxes[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        let username = comment.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[1].children[0].children[0].children[0].innerHTML;
        console.log(username);       
        await wait(10);
    }
    deletecomments();
}

async function deletecomments() {
    var delete1 = document.querySelector('[role="button"][aria-label="Delete"]');
    delete1.click();
    await wait(200);
    var delete2 = document.querySelector('._a9--._ap36._a9_1');
    delete2.click();
}

main();