class Record {
    constructor(from, to, value) {
        this.from = from;
        this.to = to;
        this.value = value;
    }
}

function getTransactions(people) {
    let records = [];

    let sum = 0;
    people.forEach(n => sum += n.personalSum);
    let average = (sum / people.length).toFixed(4);
    console.log("sum: " + sum + "\nlength: " + people.length + "\naverage: " + average);

    // update diff
    people.forEach(person => {
        person.diff = (average - person.personalSum);
        console.log(person);
    });

    // sort list of Person ascendingly by their *diff*
    people.sort((a, b) => a.diff - b.diff);

    // init 2 ptrs
    let l = 0;
    let r = people.length - 1;

    // l is always negative, 因为左边的人diff为负，要收钱
    while (l < r) {
        let ldiff = people[l].diff;
        let rdiff = people[r].diff;
        if (ldiff === 0)
            l++;
        else if (rdiff === 0)
            r--;
        else if (Math.abs(ldiff) > Math.abs(rdiff)) {  // r把自己所有钱给出去都不够l收
            people[l].diff = ldiff + rdiff// 更改原数组的value，而不是ldiff
            records.push(new Record(people[r].name, people[l].name, rdiff))
            r--;
        } else if (Math.abs(ldiff) < Math.abs(rdiff)) {
            people[r].diff = ldiff + rdiff
            records.push(new Record(people[r].name, people[l].name, -ldiff))
            l++;
        } else {
            people[l].diff = 0
            people[r].diff = 0
            records.push(new Record(people[r].name, people[l].name, rdiff))
            l++;
            r--;
        }
    }
    console.log(l, r);
    console.log(people);
    return records;
}

export default getTransactions;