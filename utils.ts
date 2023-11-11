export const formatRupiah = (value: number | bigint | string) => {
    if(!value)
        value = 0;

    // ubah value ke number jika value bukan number
    if (typeof value !== 'number') {
        value = Number(value);
    }

    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    });

    return formatter.format(value);
}