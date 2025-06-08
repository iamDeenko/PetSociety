<?php

class OrderDao extends BaseDao
{

    public function __construct($table = 'orders')
    {
        parent::__construct($table);
    }

    public function getTotalSales()
    {
        $sql = "SELECT
    SUBSTRING(o.order_date, 1, 10) AS sale_date,
    SUM(o.total_amount) AS total_sales,
    COUNT(*) AS number_of_orders
FROM
    orders o
GROUP BY
    sale_date
ORDER BY
    sale_date;
";

        $statement = $this->connection->prepare($sql);
        $statement->execute();

        $result = $statement->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    }
}
