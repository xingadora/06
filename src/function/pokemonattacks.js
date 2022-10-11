class attack {
    constructor(name, id, type, description, energyCost, damage) {
        this.name = name;
        this.id = id;
        this.type = type;
        this.description = description;
        this.energyCost = energyCost;
        this.damage = damageCalculation(damage);
    }

    isCritical() {
        // update ASAP
        return true;
    };

    criticalHit() {
        // update ASAP
        if (this.isCritical) {
            return Math.floor(this.damage * 2);
        }
    };

};

const attackGnaw = new attack('Gnaw', 'gnaw', 'Normal', 'Does 10 base damage.', 1, 10)

// console.log(attackGnaw.isCritical())
// console.log('critical: ' + attackGnaw.criticalHit())
// console.log('base: ' + attackGnaw.damage);

